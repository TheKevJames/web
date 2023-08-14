OpenSource.README
=================

I'd like to say I'm big into open source, but in practice I find I don't have
nearly as much time to devote to it as I really want to. I've tried to simplify
my OSS repos in an effort to keep this manageable.

This document is part vanity/advertisement, part tracking, and part
request-for-pull-requests!

Active OSS Projects
-------------------

These are the "brag-worthy" and "public use" ones. Recruiters, look here.

- I am the primary maintainer of the `coveralls-python`_ project used by ~12k
  OSS projects on GitHub. No affiliation with `Coveralls`_. `Over 25M downloads`_.

- I am the maintainer of the `Puppet`_ `Homebrew`_ plugin `puppet-homebrew`_.
  Over 210k downloads.

- I maintain the GNOME Shell extension for interfacing with a `Transmission`_
  daemon/gtk instance: `gnome-shell-extension-transmission-daemon`_.

- The `Franz`_/`Ferdi`_ recipes for `Dialpad`_ and `Clockwise`_ (aptly-named
  repo links: `franz-recipe-dialpad`_ and `franz-recipe-clockwise`_).

- The `MacPorts`_ ports for `several things`_, most notably `skhd`_, `yabai`_,
  and `youtube-viewer`_.

- The `Brew`_ formula for `youtube-viewer`_ (similarly aptly-named link:
  `homebrew-youtube-viewer`_).

Personal Projects
-----------------

These are the ones which really only interest me. Treat these as mostly
read-only.

- I enjoy programming `challenges`_ and keep track of all of my answers along
  with their performance. I've answered challenges in `Clojure`_, C++,
  `Julia`_, `Nim`_, Python (and maybe more by now!), and often use this as an
  excuse to learn new languages or paradigms.

- Any ad-hoc projects will often end up in my `experiments`_. This contains a
  bunch of small tidbits, generally to answer some specific problem: "how do
  I build the smallest Python Docker image?", "how performant is Sentry?",
  "which language's implementation of the Jaro-Winkler algorithm is fastest?",
  etc. Even more often, a small project will end up here on a branch before
  ending up in a more reasonable repo.

- Small, self-contained `tools`_ not quite large enough to deserve their own
  repo live here. Often, these start as `experiments`_ which have grown. A few
  of these have a surprising amount of public usage (hundreds of thousands of
  pulls from `Docker Hub`_) but updates are rarely necessary and/or fully
  automated.

- My `CV`_ is a json blob encoded in the `FRESH schema`_ which is automatically
  rendered to a more `human-readable resume format`_.

- A bunch of `web`_ projects which form varying chunks of my website, small
  web-tools, and single-page Chrome extensions.

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
- `yaaredis`_: ``aredis`` fork with improved async stability

OSS Contributions
-----------------

Features
^^^^^^^^

- `SublimeLinter - support inline tooltips`_
- `git-standup - support branch filtering`_
- `macports - contribute p5-lwp-useragent-cached port`_
- `macports - contribute skhd port`_
- `macports - contribute yabai port`_
- `macports - contribute youtube-viewer port`_
- `pipx - add support for pre-injected packages`_
- `pylint_import_modules - support globally allowed direct imports`_
- `renovate - support arbitrary versioning schemes`_
- `renovate - support envvar interpolation in requirements files`_
- `renovate - support lockfiles in subdirs`_

Fixes
^^^^^

- `Sentry (python, raven) - fix support for Python 3.8`_
- `datadogpy - make the MetricsAggregator threadsafe`_
- `protobuf (python) - fix support for Python 3.8`_
- `renovate - fix /simple compatibility for non-standard PyPI indexes`_
- `renovate - fix HTTP auth for NOPASS indexes`_
- `sensu-plugins-elasticsearch - support installations with partially disabled metrics`_

.. _Brew: https://brew.sh/
.. _CV: https://github.com/TheKevJames/cv
.. _Clockwise: https://www.getclockwise.com/
.. _Clojure: https://clojure.org/
.. _Cloudflare: https://www.cloudflare.com/
.. _Coveralls: https://coveralls.io/
.. _Dialpad: https://dialpad.com/app
.. _Docker Hub: https://hub.docker.com/
.. _FRESH schema: https://github.com/fresh-standard/fresh-resume-schema
.. _Ferdi: https://getferdi.com/
.. _Franz: https://meetfranz.com/
.. _Homebrew: https://brew.sh/
.. _Julia: https://julialang.org/
.. _MacPorts: https://www.macports.org/
.. _Nim: https://nim-lang.org/
.. _Over 25M downloads: https://pepy.tech/project/coveralls
.. _Puppet: https://puppet.com/
.. _Sentry (python, raven) - fix support for Python 3.8: https://github.com/getsentry/raven-python/pull/1298
.. _SublimeLinter - support inline tooltips: https://github.com/SublimeLinter/SublimeLinter/pull/552/
.. _Terraform: https://www.terraform.io/
.. _Transmission: https://transmissionbt.com/
.. _aerofs-sdk-python: https://github.com/redbooth/aerofs-sdk-python
.. _aeroup: https://github.com/redbooth/aeroup
.. _archived: https://github.com/TheKevJames?tab=repositories&type=archived
.. _blog: https://thekev.in/blog
.. _challenges: https://github.com/TheKevJames/challenges
.. _coveralls-python: https://github.com/TheKevJames/coveralls-python
.. _datadogpy - make the MetricsAggregator threadsafe: https://github.com/DataDog/datadogpy/pull/370
.. _deprecated: https://github.com/TheKevJames/deprecated
.. _dotsystem: https://github.com/TheKevJames/dotsystem
.. _experiments: https://github.com/TheKevJames/experiments
.. _franz-recipe-clockwise: https://github.com/TheKevJames/franz-recipe-clockwise
.. _franz-recipe-dialpad: https://github.com/TheKevJames/franz-recipe-dialpad
.. _gcloud-aio: https://github.com/talkiq/gcloud-aio
.. _gcloud-rest: https://github.com/talkiq/gcloud-rest
.. _git-standup - support branch filtering: https://github.com/kamranahmedse/git-standup/pull/114
.. _gnome-shell-extension-transmission-daemon: https://github.com/TheKevJames/gnome-shell-extension-transmission-daemon
.. _homebrew-youtube-viewer: https://github.com/TheKevJames/homebrew-youtube-viewer
.. _human-readable resume format: https://thekev.in/cv
.. _infrastructure: https://github.com/TheKevJames/infrastructure
.. _macports - contribute p5-lwp-useragent-cached port: https://github.com/macports/macports-ports/pull/9003
.. _macports - contribute skhd port: https://github.com/macports/macports-ports/pull/9005
.. _macports - contribute yabai port: https://github.com/macports/macports-ports/pull/9006
.. _macports - contribute youtube-viewer port: https://github.com/macports/macports-ports/pull/11381
.. _pipx - add support for pre-injected packages: https://github.com/pypa/pipx/pull/900
.. _protobuf (python) - fix support for Python 3.8: https://github.com/protocolbuffers/protobuf/pull/5195
.. _publishing: https://github.com/TheKevJames/publishing
.. _puppet-homebrew: https://github.com/TheKevJames/puppet-homebrew
.. _pylint_import_modules - support globally allowed direct imports: https://github.com/bayesimpact/pylint_import_modules/pull/7
.. _pystun3: https://github.com/talkiq/pystun3
.. _redis-cli-cluster: https://github.com/talkiq/redis-cli-cluster
.. _renovate - fix /simple compatibility for non-standard PyPI indexes: https://github.com/renovatebot/renovate/pull/6649
.. _renovate - fix HTTP auth for NOPASS indexes: https://github.com/renovatebot/renovate/pull/8442
.. _renovate - support arbitrary versioning schemes: https://github.com/renovatebot/renovate/pull/4273
.. _renovate - support envvar interpolation in requirements files: https://github.com/renovatebot/renovate/pull/6648
.. _renovate - support lockfiles in subdirs: https://github.com/renovatebot/renovate/pull/10689
.. _sensu-plugins-elasticsearch - support installations with partially disabled metrics: https://github.com/sensu-plugins/sensu-plugins-elasticsearch/pull/85/
.. _several things: https://ports.macports.org/search/?selected_facets=maintainers_exact:thekevjames
.. _skhd: https://github.com/koekeishiya/skhd
.. _tidbits: https://github.com/TheKevJames/tidbits
.. _tools: https://github.com/TheKevJames/tools
.. _web: https://github.com/TheKevJames/web
.. _yaaredis: https://github.com/talkiq/yaaredis
.. _yabai: https://github.com/koekeishiya/yabai
.. _youtube-viewer: https://github.com/trizen/youtube-viewer
