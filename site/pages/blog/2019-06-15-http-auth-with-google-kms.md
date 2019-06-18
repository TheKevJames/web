title: HTTP Auth with Google KMS
date: 2019-06-15
tags: Technology
description: An experiment in fine-grained HTTP authentication using Google KMS

This post is part experiment and part solution -- as per usual, my code is
available in my
[experiments Github repository](https://github.com/TheKevJames/experiments/tree/master/kms-auth).

This experiment was motivated by some recent work my team is doing at Dialpad.
[We're hiring](https://www.dialpad.com/careers/)! More specifically,
[I'm hiring](https://www.dialpad.com/careers/apply/software-engineer---data/kitchener-ontario,-canada)!

---

<link rel="stylesheet" href="https://thekev.in/emacs.css">

> tl;dr: using KMS keyrings and keys to mirror your APIs and routes lets you
> build your own robust auth solution using only Google primitives and get as
> fine-grained control of those permissions as you'd like.

Staying entirely within the GCP (Google Cloud Platform) ecosystem for eg.
server-to-server communication is very adequately handled by the builtin Google
primitives such as verification of service accounts (or, in some cases, even
some very cool implicit authorization, such as how a specific header being
received by a GAE app can verify that the
[request came from GAE Cron](https://cloud.google.com/appengine/docs/standard/python/config/cron#securing_urls_for_cron)).

One noticeably missing point, though, is in client-server communications.
There's a few partial solutions to some use-cases, but none of them really
allow for the fine-grained control that I want to specify. For example, Cloud
Run methods have a single role (`roles/run.invoker`) which can be assigned to
a user/group/serviceaccount/whatever to globally allow or revoke their
permissions to invoke any Cloud Run services within a project. Similarly, you
can go through and add this role to user-service pairs, which allows that user
global invocation access to an entire service.

But what if we want to go more granular than that, ie. allow some users access
to some routes within a service rather than just having a global on-off switch?

What if we want readonly accounts? readwrite accounts? admin accounts? In that
case, GCP doesn't provide any builtins and generally developers must fall back
to using third-party providers such as [Auth0](https://auth0.com/).

Turns out, though, that Google provides some privitives in the form of
[Cloud KMS](https://cloud.google.com/kms/) which can be used to build this
solution for ourselves, and without all that much work, either.

This is an experiment in using [Cloud KMS](https://cloud.google.com/kms/) as a
shared authority in order to create route and method level permissioning for
arbitrary use-cases. The demo code is written for Cloud Run, but with very
minor modifications this would work for any API hosted anywhere, not just on
Cloud Run on Google Cloud Platform.

#### Problem Definition and Design Decisions

Here are the specific goals:

- Our client code needs to be straightforward -- all it should need is the
  ability to prove its identity to Google (using any Google authentication
  mechanism) and to pass proof of that identity in its request to our server.

- Our server code needs to be able to validate that any request is from a user
  who has access to a given route, without being vulnerable to leaked
  credentials, replay attacks, et cetera.

- Modifying our code to add/remove routes or change permission levels should be
  straightforward and simple.

- The less shared knowledge required, the better. Obviously the client needs to
  know what endpoint to hit and how to prove its identity, but that should be
  all we need, if at all possible.

### What Be KMS?

Google's Cloud KMS is a hosted and managed key management service which
supports symmetric and asymmetric encryption or signing. I won't go into too
many details on the overview level, but instead focus on the relevant parts for
this use-case. If you're interested in learning more, check out the
[official docs](https://cloud.google.com/kms/) -- seriously, they're great.

For our use-case, here's the important part: KMS lets you create arbitrary
keyrings and arbitrary keys within those keyrings, where each key can be used
to encrypt or decrypt some arbitrary blob. Furthermore, it lets you specify
IAM roles which have encryption and/or decryption access using that key --
the fact that you can specify either or is important here.

This mirrors a lot of the standard use-cases with API servers: in the same way
a keyring has keys, an API has routes and methods. In the same way KMS
specifies encryptors and decryptors of a shared resource, and API has a client
and a server; both perform different operations, but rely on a shared resource.

Our goal, then, is this: for each API we deploy, create a keyring. For each
route and method within that API, create a key. For each server of that API,
make sure it can decrypt using that key. For each valid client of that route,
make sure it can encrypt using that key. Then, if a request comes in that can
be decrypted by the server given the correct route information (eg. key), we
know that it was encrypted by someone on our whitelist for that route.

So what's our shared information here? We'd need to know the GCP project where
the key is stored, the name of the keyring, and the name of the key. With some
clever naming, that's completely reasonable -- if you think about it, that's
not really any more information than you already need to know to hit any other
API: you need to know the URL where it's running (eg. the project and keyring)
and which route to hit (eg. the key).

All it takes is a bit of clever naming and some DNS magic to make those one and
the same, eg. to convert between

    #!bash
    POST https://best-animal.thekevfunctions.thekev.in/vote

to

    #!python
    project = 'thekevfunctions'
    keyring = 'best-animal'
    key = 'vote'  # or, even more fine-grained: 'POST-vote'

We'll need to throw this under the auth header of our API docs, of course, but
this certainly doesn't seem unreasonable to me.

### Talk Servers To Me

Alright, let's start by getting some boilerplate out of the way, so we know
what we're working with. I'm going to be writing code with Python 3.6+ and
[Sanic](https://pypi.org/project/sanic/) out of personal preference, but very
little of this solution should be tied to those specifics. If you want to write
this with non-async code or if you want to make puppies cry and use Python 2,
all this should work (with the use of the equivalent compatible libraries) just
fine.

    #!python
    import sanic
    from sanic.request import Request
    from sanic.response import HTTPResponse

    app = sanic.Sanic()

    @app.route('/resource', methods=['POST'])
    async def create_resource(request: Request) -> HTTPResponse:
        await verify_auth('create-resource', request.headers)

        # business logic goes here

        return HTTPResponse('ok', status=200)

    if __name__ == '__main__':
        app.run(host='0.0.0.0', port=8080)

Basically, all we're doing here is spinning up a Sanic server with a single
route: `POST /resource`, which will let users create some sort of resource.
There are two important pieces here to call out:

The first important chunk is the call to `verify_auth` -- we'll get to its
definition in a second, but that's where I'll write the meat of our token
validation logic. I've written it as a function call for simplicity, but it
would be easy enough to implement as a decorator or some middleware, if that's
your cup of tea. The idea would be that this helper gets called first thing on
every API call, however you want to do that.

The second important chunk is the arguments to `verify_auth` -- in this case,
I've passed in the headers from our client and `'create-resource'`. The latter
is going to act as my key name; I've hardcoded it for this example, but if you
want to get fancy this could easily be autogenerated from, say, your API docs
(you have those, right?) or from the assigned `route` and `methods` or any
other combination.

Now that we've got some boilerplate, let's talk verification:

    #!python
    async def verify_auth(route: str, headers: dict) -> None:
        kind, token = headers.get('Authorization', 'no auth').split()
        if kind != 'Bearer':
            raise Unauthorized('invalid token type', scheme='Bearer')

First off, we grab the authorization header out of our request. We know that we
only want to support bearer tokens, so we double-check our token is the right
type first.

If you want to allow other forms of auth, you could forward 'em off to a
different verification function here, say if you want to insert a root username
and password to have a backdoor past your security (I've heard the best
practice is *not* to do this, FYI).

    #!python
    from gcloud.aio.kms import KMS
    from gcloud.aio.kms import decode

    async with aiohttp.ClientSession() as sess:
        kms = KMS(PROJECT, SERVICE, route, session=sess)
        try:
            payload = decode(await kms.decrypt(token))
        except Exception:
            raise Unauthorized('access denied', scheme='Bearer')

Alright, so first off, I want to call out that I'm using the
[gcloud-aio-kms](https://pypi.org/project/gcloud-aio-kms/) library here to
communicate with Cloud KMS. Full disclaimer: `gcloud-aio-*` is an open-sourced
set of libraries from my team at Dialpad (scroll back up for the "I'm hiring"
message). Google has some official libraries as well, which are great, but have
some restrictions:

- their `appengine` SDK only works on Appengine (er, duh)
- their [google-cloud-kms](https://pypi.org/project/google-cloud-kms/) library
  (and the other `google-cloud-*` libraries) are either synchronous, not
  thread-safe, or use Google's own concurrency primitives rather than asyncio.

Since I like writing asynchronous code, neither of those work all that well for
me.

Anyway, we first pass our KMS library the path to the key we're interested in
using here, in this case by specifying the GCP project, the keyring/service
name, and the key/route name. Quick callout to the `PROJECT` and `SERVICE`
arguments -- how to get these will certainly vary depending on which GCP
service to which you deploy your API (or if you deploy it elsewhere entirely),
but more often than not they'll be set as environment variables somewhere.

The crux of this logic is the `kms.decrypt` command -- if KMS cannot
successfully decrypt that token with the specified arguments, we know that the
client did not send us a token which had been encrypted by a user who has
access to the correct secret key. That's step one of any verification scheme
right there.

    #!python
    if json.loads(payload).get('epoch', 0) < time.time() - TOKEN_TTL:
        raise Unauthorized('token expired', scheme='Bearer')

Using that now-decrypted payload, we check that the token has not expired by
comparing the data it contains to the current time. Note that this check is not
meant to solve **user** expiration (we'll get to that later), but rather to
prevent replay attacks and to give us a mechanism for allowing token
reuse/expiration within some time-range, if we want to allow that.

You'll want to keep this pretty low -- it depends on the semantics of your API,
of course, and on how much you trust your users. YMMV.

At that point... well, we're done on the server side. We've validated that a
request header came from a valid user who has access to the correct resource
and proved that was done within the last `TTL` amount of time.

The fully annotated code for our server can be found
[here](https://github.com/TheKevJames/experiments/blob/master/kms-auth/server.py).

### What About the Clients?

The client code is just as straightforward as the server code. Its going to do
pretty much all the same things, but in... uh, reverse? inverse? Something like
that.

Let's start with how a request would look with no authentication at all, and
see what we need to add.

    #!python
    import aiohttp

    async def create_resource():
        url = 'https://best-animal.thekevfunctions.thekev.in'
        data = {'best-animal': 'aardvark'}

        async with aiohttp.ClientSession() as sess:
            resp = await sess.post(f'{URL}/resource', data=resource)
            resp.raise_for_status()

    # Yeah, yeah, `asyncio.run()`, I know.
    asyncio.get_event_loop().run_until_complete(create_resource())

You probably already have some code that looks like this somewhere: using a URL
and an http library, set the value of some resource to the unquestionable
truth.

If we want to let only our whitelisted users declare what is the truth (sweet
jesus that sentence came out badly... ah well, I'm leaving it), we'll need to
have the client generate and send along an auth header.

    #!python
    import aiohttp
    import json
    import time
    from gcloud.aio.kms import KMS
    from gcloud.aio.kms import encode

    project = 'thekevfunctions'
    service = 'best-animal'
    route = 'create-resource'

    async with aiohttp.ClientSession() as sess:
        kms = KMS(project, service, route, session=sess)
        payload = json.dumps({'epoch': time.time()})
        token = await kms.encrypt(encode(payload))

        headers = {
            'Authorization': f'Bearer {token}',
        }

Then it's just a matter of attaching those headers to our request:

    #!python
    resp = await sess.post(f'https://{service}.{project}.thekev.in/resource',
                           headers=headers, data=resource)

That's... just about it. The client generates a token, the server can validate
that token, everything is rainbows and puppies. Code is
[here](https://github.com/TheKevJames/experiments/blob/master/kms-auth/client.py).

### Configure the Google

The only thing left to do is to configure the IAM bindings which will ensure
all the right users/apps/whatever can do all the right things and only those
things. I believe having infrastructure-as-code is a no-brainer, but each of
these chunks can be specified in the GCP UI as well. Note that encoding these
configurations in code is what brings our solution from "workable" to "actually
useful" -- ie. keeping your configuration of keyrings and keys up-to-date with
any new/removed APIs, rather than having to manually configure every single
route.

First off, let's make sure our API server has a Google service account:

    #!terraform
    resource "google_service_account" "api-my-api-service" {
      account_id   = "api-my-api-service"
      display_name = "API (my-api-service)"
    }

Always a good idea to ensure each unique resource gets its own service account,
plus it'll make the rest of this configuration more understandable.

    #!terraform
    resource "google_kms_key_ring" "my-api-service" {
      name     = "my-api-service"
      location = "global"
    }

One keyring gets created for every service.

    #!terraform
    resource "google_kms_key_ring_iam_binding" "key_ring" {
      key_ring_id = "${google_kms_key_ring.my-api-service.self_link}"
      role        = "roles/cloudkms.cryptoKeyDecrypter"

      members = [
        "serviceAccount:${google_service_account.api-my-api-service.email}",
        "group:developers@company.com",
      ]
    }

Then, the service account for your API server is marked as being allowed to
decrypt with any keys in that keyring, so it can verify requests. Note that
I've also marked down that developers can decrypt using this key as well --
since it's not the data that's being encrypted which is meant to be secure here
but rather the act of encryption itself being what matters, this is a secure
way to ensure you don't need to, say, disable authentication when running in
dev/staging/whatever. Even running this API on a dev's laptop should
authenticate no problem.

    #!terraform
    variable "routes_standard" {
      default = ["create-resource", "view-resource", ...]
    }
    variable "routes_admin" {
      default = ["modify-settings", ...]
    }
    # etc.

Just defining some variables to help us with the next few resources, this is
the list of keys and access levels associated with the API. In this case, I
only care to create two access levels, eg. "standard" users and "admin" users,
but there's really no limit to this.

As I mentioned above, the *coolest* thing to do would be to autogenerate this
from somewhere, say from your API docs or code, so that all your permissions
get updated simultaneously with your API.

    #!terraform
    resource "google_kms_crypto_key" "routes-standard" {
      count = "${len(var.routes_standard)}"

      name            = "${var.routes_standard[count.index]}"
      key_ring        = "${google_kms_key_ring.my-api-service.self_link}"
      rotation_period = "86400s"
    }

    resource "google_kms_crypto_key" "routes-admin" {
      count = "${len(var.routes_admin)}"

      name            = "${var.routes_admin[count.index]}"
      key_ring        = "${google_kms_key_ring.my-api-service.self_link}"
      rotation_period = "86400s"
    }

We create each of the specified keys. Note that I've purposely defined them as
separate resources here to make it easier to attach the right permissions later
on.

At this point, we've specified a rotation period for our KMS keys (one day, the
lowest Google allows), which will ensure that new key material is regularly
used so that exposed keys can get expired. Google also allows you to manually
cause a rotation in case you, say, suspect a breach has occurred.

Plus it's just good practice: if you ever find yourself needing to rotate your
keys and you don't already have that infrastructure and workflow in place,
you're going to be in for many sleepless nights.

    #!terraform
    resource "google_kms_crypto_key_iam_binding" "crypto_key" {
      count = "${len(var.routes_standard)}"

      crypto_key_id = "${google_kms_crypto_key.routes-standard[count.index].self_link}"
      role          = "roles/cloudkms.cryptoKeyEncrypter"

      # Any arbitrary accounts can be given access to this API by listing them
      # here.
      members = [
        "user:cto@company.com",
        "group:developers@company.com",
        "serviceaccount:some-client-app@appspot.gservice.com",
        # etc
      ]
    }

    resource "google_kms_crypto_key_iam_binding" "crypto_key" {
      count = "${len(var.routes_admin)}"

      crypto_key_id = "${google_kms_crypto_key.routes-admin[count.index].self_link}"
      role          = "roles/cloudkms.cryptoKeyEncrypter"

      # Similarly, more privileged accounts could be listed here.
      members = [
        "user:cto@company.com",
        "group:admins@company.com",
        # etc
      ]
    }

Finally, we list all the relevant accounts which should have access to the
specified routes. Note that you can specify pretty much anything there:
individual users, groups of users, service accounts, and even entire domains.
Plus you could specify `allUsers` which allows access to literally everyone
but, I mean, if you were going to do that, you probably wouldn't be reading
this post.

There's some cool stuff you can do here with terraform that's probably worth
calling out since it's such a common usecase for authentication -- since you can
refer to other resources, it's easy to create cascading permissions.

Say, if you want all admins to implicitly get access to the readwrite routes,
and all readwrite users to get access to the readonly routes:

    #!terraform
    resource "google_kms_crypto_key_iam_binding" "key-admin" {
      # SNIP..
      members = ["group:admin@company.com"]
    }

    resource "google_kms_crypto_key_iam_binding" "key-readwrite" {
      # SNIP..
      members = [
        "group:readwrite@company.com",
        "${google_kms_crypto_key_iam_binding.key-admin[count.index].members}",
      ]
    }

    resource "google_kms_crypto_key_iam_binding" "key-readonly" {
      # SNIP..
      members = [
        "group:readonly@company.com",
        "${google_kms_crypto_key_iam_binding.key-readwrite[count.index].members}",
      ]
    }

You can see how this looks all in one place
[here](https://github.com/TheKevJames/experiments/blob/master/kms-auth/configuration.tf).

### Wrap-Up

That's about all I have to say on this one. There's a bit of setup cost to
getting this up-and-running and integrated with you're particular stack, but at
its core it's a pretty simple solution without much in the way of shared
information.

This solution can very easily be modified for server-to-server comunication,
ie. by having what I've designated as the client and server act in the opposite
way when communicating from server to client (the server encrypts something,
the client decrypts it to validate communication). Sounds like build-your-own
mutual TLS to me.

Additionally, this sets you up for doing security Right™ since all your
services must already have a connection to KMS. You can encrypt any secrets
with KMS instead of committing them to your public git repositories and let
your servers decrypt them on-the-fly! Or at startup, or at compile time, or
whatever. I don't judge.

<!-- Pygments doesn't like Terraform :( -->
<style>
.codehilite .na {
    color: #000 !important;
}
</style>
