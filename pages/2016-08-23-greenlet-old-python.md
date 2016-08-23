title: Greenlet on Old Systems
date: 2016-08-23

I ran into an issue when trying to set up a Docker container for Plivo; this
has to do mostly with `greenlet` on old systems as well as any packages such as
`gevent` which rely on this.

More specifically, for Python 2.7.3 and older only, projects requiring
`greenlet` may throuw an error on attempting to run them

    #!python
    ImportError: greenlet.so: undefined symbol: _PyTrash_thread_deposit_object

since `_PyTrash_thread_deposit_object` was not defined in those versions.

This specifically affected me since Plivo requires `libgnutls-dev`, which is
not present in the default `debian:jessie` or newer base Docker images... using
`debian:wheezy`, though, only gives us Python 2.7.3. Fortunately, this is
fixeable without installing anything from non-standard sources!

The issue arises when we `pip install greenlet` (or `pip install PACKAGE`,
where `PACKAGE` relies on `greenlet`, eg. `gevent`). The simple fix for this is
to make sure we don't install the broken `greenlet` binary:

    #!bash
    pip install --no-binary greenlet gevent

Specifically for Plivo, modifying the `plivo_install.sh` script with the above
change is enough to let us start Plivo with no issues.
