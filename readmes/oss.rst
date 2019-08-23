OpenSource.README
=================

I'd like to say I'm big into open source, but in practice I find I don't have
nearly as much time to devote to it as I really want to. I've tried to simplify
my OSS repos in an effort to keep this manageable.

This document is part vanity/advertisement, part tracking, and part
request-for-pull-requests!

Active OSS Projects
-------------------

These are the "brag-worthy" ones. Recruiters, look here.

- I am the primary maintainer of the `coveralls-python`_ project used by ~6.5k
  OSS projects on GitHub. No affiliation with `Coveralls`_. Over 6M downloads.

- I am the maintainer of the `Puppet`_ `Homebrew`_ plugin `puppet-homebrew`_.
  Over 60k downloads.

- I maintain the GNOME Shell extension for interfacing with a `Transmission`_
  daemon/gtk instance: `gnome-shell-extension-transmission-daemon`_.

- The `Franz`_ recipe for `Dialpad`_ (aptly-named repo link:
  `franz-recipe-dialpad`_). Pending inclusion in Franz official recipe list.

Personal Projects
-----------------

These are the ones which really only interest me. Treat these as mostly
read-only.

- I enjoy programming `challenges`_ and keep track of all of my answers along
  with their performance. I've answered challenges in `Clojure`_, C++,
  `Julia`_, and Python (both 2 and 3), and often use this as an excuse to learn
  new languages or paradigms.

- Any ad-hoc projects will often end up in my `experiments`_. This contains a
  bunch of small tidbits, generally to answer some specific problem: "how do
  I build the smallest Python Docker image?", "how performant is Sentry?",
  "which language's implementation of the Jaro-Winkler algorithm is fastest?",
  etc. Even more often, a small project will end up here on a branch before
  ending up in a more reasonable repo.

- Small, self-contained `tools`_ not quite large enough to deserve their own
  repo live here. Often, these start as `experiments`_ which have grown. A few
  of these have a surprising amount of public usage (tens of thousands of pulls
  from `Docker Hub`_) but updates are rarely necessary and/or fully automated.

- My `CV`_ is a json blob encoded in the `FRESH schema`_ which is automatically
  rendered to a more `human-readable resume format`_.

- A bunch of `web`_ projects which form varying chunks of my website, small
  web-tools, and single-page Chrome extensions.

- Various Python `tidbits`_ which would otherwise be copied-and-pasted into
  most projects I touch are released on PyPI. This sort of thing would be much
  better solved by a file- or method-level ``git subtree``-like feature, but
  sadly one does not exist.

- Various miscellaneous `publishing`_ lives in a repo as well. Most of this is
  linked to from my `blog`_.

- I've finally come to a happy place in building a system for my dotfiles (or a
  `dotsystem`_, if you will). Very opinionated, very in-depth. Might be useful
  to other folks as a resource for configuring pretty much every app I've used,
  but unlikely to be something anyone else uses directly.

- I handle my `infrastructure`_-as-code as a sequence of `Terraform`_ configs.
  Most of this is for configuring my other projects, `Cloudflare`_, etc.

- I also have various `deprecated`_ and `archived`_ projects. These are not the
  codes you're looking for.

Open-Source'd Through Work
--------------------------

- `aerofs-sdk-python`_: Python SDK for AeroFS APIs
- `aeroup`_: Secure file-sharing (hackathon demo for AeroFS APIs)
- `gcloud-aio`_: asynchronous Python library for GCP APIs
- `gcloud-rest`_: threadsafe Python library for GCP APIs
- `redis-cli-cluster`_: ``redis-cli`` clone with native cluster support
- `pystun3`_: ``pystun`` fork with Python 3 support

OSS Contributions
-----------------

Features
^^^^^^^^

- `support arbitrary versioning schemes in Renovate`_
- `inline tooltip support for SublimeLinter`_
- `support globally allowing direct imports in pylint_import_modules`_

Fixes
^^^^^

- `make the Datadog MetricsAggregator threadsafe`_
- `ensure protobufs support Python 3.8`_
- `ensure Sentry supports Python 3.8`_
- `support missing Elasticsearch metrics in Sensu`_

.. _aerofs-sdk-python: https://github.com/redbooth/aerofs-sdk-python
.. _aeroup: https://github.com/redbooth/aeroup
.. _archived: https://github.com/TheKevJames?tab=repositories&type=archived
.. _blog: https://thekev.in/blog
.. _challenges: https://github.com/TheKevJames/challenges
.. _Clojure: https://clojure.org/
.. _Cloudflare: https://www.cloudflare.com/
.. _coveralls-python: https://github.com/coveralls-clients/coveralls-python
.. _Coveralls: https://coveralls.io/
.. _CV: https://github.com/TheKevJames/cv
.. _deprecated: https://github.com/TheKevJames/deprecated
.. _Dialpad: https://dialpad.com/app
.. _Docker Hub: https://hub.docker.com/
.. _dotsystem: https://github.com/TheKevJames/dotsystem
.. _ensure protobufs support Python 3.8: https://github.com/protocolbuffers/protobuf/pull/5195
.. _ensure Sentry supports Python 3.8: https://github.com/getsentry/raven-python/pull/1298
.. _experiments: https://github.com/TheKevJames/experiments
.. _franz-recipe-dialpad: https://github.com/TheKevJames/franz-recipe-dialpad
.. _Franz: https://meetfranz.com/
.. _FRESH schema: https://github.com/fresh-standard/fresh-resume-schema
.. _gcloud-aio: https://github.com/talkiq/gcloud-aio
.. _gcloud-rest: https://github.com/talkiq/gcloud-rest
.. _gnome-shell-extension-transmission-daemon: https://github.com/TheKevJames/gnome-shell-extension-transmission-daemon
.. _Homebrew: https://brew.sh/
.. _human-readable resume format: https://thekev.in/cv
.. _infrastructure: https://github.com/TheKevJames/infrastructure
.. _inline tooltip support for SublimeLinter: https://github.com/SublimeLinter/SublimeLinter/pull/552/
.. _Julia: https://julialang.org/
.. _make the Datadog MetricsAggregator threadsafe: https://github.com/DataDog/datadogpy/pull/370
.. _publishing: https://github.com/TheKevJames/publishing
.. _puppet-homebrew: https://github.com/TheKevJames/puppet-homebrew
.. _Puppet: https://puppet.com/
.. _pystun3: https://github.com/talkiq/pystun3
.. _redis-cli-cluster: https://github.com/talkiq/redis-cli-cluster
.. _support arbitrary versioning schemes in Renovate: https://github.com/renovatebot/renovate/pull/4273
.. _support globally allowing direct imports in pylint_import_modules: https://github.com/bayesimpact/pylint_import_modules/pull/7
.. _support missing Elasticsearch metrics in Sensu: https://github.com/sensu-plugins/sensu-plugins-elasticsearch/pull/85/
.. _Terraform: https://www.terraform.io/
.. _tidbits: https://github.com/TheKevJames/tidbits
.. _tools: https://github.com/TheKevJames/tools
.. _Transmission: https://transmissionbt.com/
.. _web: https://github.com/TheKevJames/web
.. _you-should-read: https://github.com/TheKevJames/you-should-read
