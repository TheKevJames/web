title: OSS Project Release Notes
date: 2021-07-23
tags: Technology
description: My wishlist for ideal OSS project release notes

Someone recently asked me what I considered to be the gold standard for release
notes for an OSS project. Turns out I'm unreasonably picky, so rather than a
simple answer you all get to enjoy (one hopes) a full blog post on the subject.

Opinions are my own, this is aspirational rather than some sort of natural law,
I don't always follow all of these and *yes I feel bad about that*, etc. Onto
the interesting part!

### tl;dr

For release notes:

* concise feature / fix / other sections with breaking changes / security
  implications called out, with security issues described alongside their
  priorities / links to CVEs / etc
* new usage patterns and "how to update" explained precisely
* changes are linked back to the relevant code / change request / etc
* all release details should exist in repo, though they may be duplicated
  elsewhere for ease-of-use

For the changelog:

* full changelog must be accessible from somewhere obvious (root of repo,
  linked in description, etc)
* past releases should include a date directly in the changelog
* for projects with slow release cycles, a WIP list of unreleased changes

### Specifics

Your first step should always be in your repo, preparing the changelog prior to
making a new release. Automated tools such as
[clog-cli](https://github.com/clog-tool/clog-cli) can be great for this: you
should be hand-updating these when it comes to release time, but using
automation to ensure each changeset is listed out to be able to maintain a list
of unreleased changes will make the release that much easier.

Any sort of automation you can enable to make sure this "unreleased changes"
section doesn't require human work is great; using a specified format for your
commit messages such as the
[conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) style
can make this virtually trivial, since there are a mass number of tools which
can generate changelogs, news files, etc out of the consistent format. More
generally -- and out of scope of this post -- having a consistent commit style
just plain makes it easier to find things in your history and to track down any
newly introduced bugs.

Once you want to cut a release from this changelog, you'll want to declare your
new version and clean up the contents. Specifically: add a new heading with
your new version (following [semver](https://semver.org/), ideally -- it's
completely useless to your users to have the release number be "2021.07.23"
since that *doesn't tell us anything new about your release*!), the current
date, and long-form descriptions of each relevant change. The long-form
descriptions should include all categories of changes (with breaking and
security changes being loudest, then features and bugfixes broken out from any
other changes, with any further categorization being icing on top), each with
a clear description and a link back to the relevant changeset.

That might look something like this:

    #!markdown
    ## 2.1.0 (2021-07-23)

    ### Security

    #### Critical

    * **server**:  the server now supports TLS. (#123 - 4439bb2)

      You can enable this support by setting `let_my_data_be_intercepted` to
      `False` or omitting it entirely:

      ```diff
      - server.serve(let_my_data_be_intercepted=True)
      + server.serve()
      ```

    #### Minor

    * **server**:  internal encryption keys have been updated from 2048 to 4096
      bytes. (#138 - d807a4e)

    ### Features

    * **frobinator**:  the frobinator can now travel backwards through time by
      passing in `speed=142` as an argument to `flux_capacitor()`. Note that
      this may cause undefined behaviour when `POWER != '1.21'`. (#124, #126)

    ### Bugfixes

    * **foobarnication**:  passing a `foo` value of `42` no longer causes a
      segfault. (#125 - 0461741)
    * **foobarnication**:  passing a `bar` value of `666` no longer leads to
      an eventual collapse in the local space-time continuum. (#131 - 9f62dd3;
      thanks @MrAardvarkEsquire!)

      If you currently have `bar=666`, please ensure you run `reset_space()`
      after upgrading to the new release!

    ### Other

    * **docs**:  fixed several typos of "floccinaucinihilipilification".

    ## 2.0.3 (2021-07-10)

    [//]: # etc, previous releases

This changelog should be updated in your mainline branch of your source tree
along with any other changes required to push your release (ie. bumping the
version number elsewhere in code, but separately from any feature work related
to that release!). `./CHANGELOG.md` is a great place for your changelog, since
it's very visible and used commonly enough for people to check there, but
something similar such as `./RELEASE.rst` or such is also fine.

> Technically, I'd suppose having this changelog file be visible in the repo
> and linked to from your README and other docs would be the zeroeth step.
> Sadly, my backspace key appears to be acting up.

The changeset with the above changes (which I'll refer to as your "release
commit") should be pushed to your remote along with an **annotated** tag
containing the above release notes (note: this chunk is `git` specific, but if
you haven't yet drunk the koolaid that is `git`, there are almost certainly
equivalents in your VCS of choice).

> Why an annotated tag in particular? Well, roughly, a "normal" git tag is just
> a lightweight pointer whereas an annotated tag can include additional things
> like, oh, I don't know, release notes. Additionally, git provides some nice
> facilities for viewing annotated tag messages and for showing only annotated
> tags without lightweight ones.
>
> Using annotated tags also gives you a couple nice freebies elsewhere: for
> example, you can use `git describe` to find the latest annotated tag and to
> show how much has changed since then. That makes it fantastic for describing
> the state of eg. nightly releases as compared to your latest stable release:
>
>     #!shell
>     $ git describe
>     v1.2.3-2-g977ec16
>     # HEAD points to 977ec16, which is two commits after release v1.2.3

`git tag -a v1.2.3` is a nice easy way to do this. That'll open up your editor,
where you can paste in the same release notes you typed above. Feel free to
omit the version and date, since that's already obvious from the tag metadata.
The tag is also a good place to include anything specific to the update flow;
for example, you may want to add something like:

    #!markdown
    To update to this release, please run:

      ./bin/foobar upgrade --stable

    If you're updating from a version earlier than v0.3.2, please run the
    following first:

      ./bin/foobar config set use_new_update_system=true

Ideally, this tag is the source of truth; eg. the act of pushing that tag
should cause your CI system to release the new version to your package
registry and any other release / post-release tasks. Though automation isn't a
requirement for having good release notes, avoiding cases where your tags are
out of sync with reality (say, in cases where a release fails and needs to be
retried after a fix) will make everyone's life easier.

Finally, you should consider duplicating this release data for the specifics of
your environment. For example, if you're on Github you'll find that "Releases"
are not automatically created for your tags, annotated or otherwise, so you'll
want to explicitly click the button once you've pushed the tag. It may or may
not succeed at properly parsing your release notes from the tag, so doing a
manual check and cleanup might be nice as well. Similarly, if you have an
external site for the project, you may want to update a "News" page there.

Does this lead to a bit of duplication? Absolutely! Is that better than folks
being unable to track down changes when they need to from whatever context they
happen to be in? Most definitely. Keep in mind that some folks will be
accessing your changelog by pulling your repo, some will see it via your repo
host's web portal, some might read it in their RSS feeds, etc. As much as I'd
love to live a life where all those systems read from a single source of truth,
it just ain't the case. Make your changelog loud and visible, save the world.

### Hall of Fame

To illustrate some of my above points, I'd like to call out a few projects
which do some of the above quite well.

[SpaCy's update diffs](https://spacy.io/usage/v2-3): SpaCy includes a verbose
"What's New" page for each release. Especially wonderful is their explicit
callouts for places where their changes will require client code changes and
exactly how to go about doing so. See "No preloaded vocab" on that page, which
includes the following:

    #!diff
    - lexemes = [w for w in nlp.vocab]
    + lexemes = [nlp.vocab[orth] for orth in nlp.vocab.vectors]

[Redis' upgrade urgencies](https://raw.githubusercontent.com/antirez/redis/6.0/00-RELEASENOTES):
Redis assigns all changes with an upgrade urgency level and is careful to call
out why a user might want / need to upgrade. Security implications are
explicitly called out and the urgency is described conditionally on impact. See
version "6.0.15" on that page, which includes the following:

    #!markdown
    ================================================================================
    Redis 6.0.15 Released Wed Jul 21 16:32:19 IDT 2021
    ================================================================================

    Upgrade urgency: SECURITY, contains fixes to security issues that affect
    authenticated client connections on 32-bit versions. MODERATE otherwise.

    Fix integer overflow in BITFIELD on 32-bit versions (CVE-2021-32761).
    An integer overflow bug in Redis version 2.2 or newer can be exploited using the
    BITFIELD command to corrupt the heap and potentially result with remote code
    execution.

[Renovate's automation](https://github.com/renovatebot/renovate/releases/tag/25.56.9):
All Renovate changes auto-generate the relevant changelogs including links back
to the change requests which led to those changes and the commits once they hit
the mainline tree. Additionally, their bot automatically
[comments on each change request](https://github.com/renovatebot/renovate/pull/10916#issuecomment-885303065)
included in a given release to make it even easier to track down when a given
change was released.
