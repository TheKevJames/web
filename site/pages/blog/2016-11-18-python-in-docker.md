title: Python in Docker
date: 2016-11-18
tags: Technology

I've been playing around a lot lately with Docker containers.

I know, I know; there've been a lot of blog posts about Docker lately, the
whole thing is practically a religious war by now. But that's not what I want
to talk about. You like Docker? That's fine. You hate it? That's fine, too.

This article isn't about the merits of docker-ization or anything like that,
I'm not going to try to convince you adopt a dockerized infrastructure or play
up the benefits you'd get by doing so (dev-prod parity! self-healing
infrastructure! a cure for male-pattern baldness!). My only goal here is to
explain how I built Python containers that are conducive to a rapid development
cycle. Do you use Python in Docker? Read on.

Basically, this post is about the volumization problem. Take the following
Dockerfile:

    #!bash
    FROM python:3.5.2-alpine

    COPY requirements.txt /src/requirements.txt
    RUN pip install --no-cache-dir -r /src/requirements.txt

    COPY . /src
    RUN pip install /src

    CMD my-cool-project

This Dockerfile does a lot of things right: it's clean and simple, it copies
the requirements before the project to help with layer caching, and it should
be easy to understand for... well, pretty much everyone.

Do you see what it does wrong?

    #!bash
    $ docker build -t my-cool-image .
    $ docker run --rm -it my-cool-image py.test /src
    # ... 1 test failure ...
    $ echo "fix my app" >> my-app.py
    $ docker run --rm -it my-cool-image py.test /src
    # ... 1 test failure ...

Woah, why didn't that second test fix it?

The problem here is that Docker implicitly adds a build step to an app that
otherwise wouldn't need one. This increases development time horrendously --
what used to be a simple alternation between coding and running tests now
includes a third, sometimes long, build step.

Well, how do we fix that?

There's a few options here, pretty much all of which involve
[volumes](https://docs.docker.com/engine/reference/builder/#/volume). With this
flag, we can mount any folder on our host machine to any folder on a container.

    #!bash
    $ docker build -t my-cool-image .
    $ docker run --rm -it -v $(pwd):/src my-cool-image py.test /src
    # ... 1 test failure ...
    $ echo "fix app" >> my-app.py
    $ docker run --rm -it -v $(pwd):/src my-cool-image py.test /src
    # ... all tests pass ...

Perfect! Marvelous! We're done here, everything works! Good night everyone,
hope you enjoyed this post.

...

Still here? Well, if you're still here, that probably means you ran into the
same issue I did and are looking for a real solution. What's this additional
problem?

It's simple.

Let's pretend you have the following test:

    #!python
    def test_everything():
        import my_cool_project

        assert my_cool_project.does_everything()

Pretty good test, eh?

Now, if you have a test like this, even with the above volumization fix, you
still will need to re-build the container before you can get a passing test.

Why is this?

Well, the answer lies in our Dockerfile. When we do a `pip install <folder>`,
we're basically making a copy of the _current state of that directory_ and
copying it to a more system-wide location. When we change the original
directory -- either manually within the container or by doing a volume mount,
this system-wide install is not updated to reflect the changes.

In order to have the installed version of a package updated when we make any
changes, pip provides "editable" mode:

    #!bash
    $ pip install --help | grep editable
        -e, --editable <path/url>   Install a project in editable mode (i.e. setuptools "develop mode") from a local project path or a VCS url.

So what if we add the `-e` flag to our `pip install /src` line in the
Dockerfile?

Well, it turns out there's a problem with this approach: the "editable" flag
creates a "my-cool-project.egg-info" file in your project's directory that is
basically used to make that system-wide installation I talked about earlier
into a symlink to this directory.

See the problem yet?

When you volume-mount your host machine's project directory over the one in the
container, it won't have an `egg-info` file. Instead, you'll end up with this:

    #!bash
    Traceback (most recent call last):
      File "/usr/local/bin/my-cool-project", line 5, in <module>
        from pkg_resources import load_entry_point
      File "/usr/local/lib/python3.5/site-packages/pkg_resources/__init__.py", line 2927, in <module>
        @_call_aside
      File "/usr/local/lib/python3.5/site-packages/pkg_resources/__init__.py", line 2913, in _call_aside
        f(*args, **kwargs)
      File "/usr/local/lib/python3.5/site-packages/pkg_resources/__init__.py", line 2940, in _initialize_master_working_set
        working_set = WorkingSet._build_master()
      File "/usr/local/lib/python3.5/site-packages/pkg_resources/__init__.py", line 635, in _build_master
        ws.require(__requires__)
      File "/usr/local/lib/python3.5/site-packages/pkg_resources/__init__.py", line 943, in require
        needed = self.resolve(parse_requirements(requirements))
      File "/usr/local/lib/python3.5/site-packages/pkg_resources/__init__.py", line 829, in resolve
        raise DistributionNotFound(req, requirers)
    pkg_resources.DistributionNotFound: The 'my-cool-project' distribution was not found and is required by the application

I crawled through the pip documentation for a way to fix this; as far as I can
tell there is no solution to this. Only the "editable" flag solves our problem,
but it will only ever create an "egg-info" in the project's directory.

Now here's our saving grace: at its core, Python package management has a...
confusing history. `setuptools`, `distutils`, `easy_install`... each of these
projects has contributed a bit towards making the state of Python package
management into what it is today. How about if we go backwards a little bit?
Really, `pip install -e <folder>` is just a wrapper around calling `cd <folder>
&& python setup.py develop`, with a bit of added goodness. What if we were to
call this directly?

    #!bash
    $ python setup.py --help-commands | grep develop
      develop           install package in 'development mode' to the current working directory

Aha! This looks like it works almost exactly the same as pip's editable mode,
except for one crucial difference: rather than creating the "egg-info" in the
_project_ directory, it creates it in the _current_ directory.

What if we install our project from a directory that won't be mounted over? It
turns out this works perfectly, the only catch being we need to update the
`$PYTHONPATH` to deal with our fuckery.

So what does our Dockerfile look like now?

    #!bash
    FROM python:3.5.2-alpine

    ENV PYTHONPATH=/src

    COPY requirements.txt /src/requirements.txt
    RUN pip install --no-cache-dir -r /src/requirements.txt

    COPY . /src
    RUN cd /usr/local/lib/python3.5/site-packages && python /src/setup.py develop

    CMD my-cool-project

Note there are two changes here: we add `/src` to `$PYTHONPATH` so that the
"egg-info" file which will be created in `site-packages` has a way of finding
our project directory, and we use `python setup.py develop` rather than pip in
editable mode. Note that you can use any directory here, I just used the global
`site-packages` for consistency with other packages.

Now, we can either run our container without a volume mount and get the
standard behaviour we would expect out of a Docker container or we can mount
our project directory to `/src` and gain the ability to do rapid development
without needing to rebuild the container!

    #!bash
    $ docker run --rm -it -v $(pwd):/src my-cool-image py.test /src
    ======================= test session starts ================================
    platform linux -- Python 3.5.2, pytest-3.0.4, py-1.4.31, pluggy-0.4.0
    rootdir: /src, inifile:
    collected 1 items

    tests/test_all.py F

    ============================= FAILURES =====================================
    ____________________________ test_thing ____________________________________

        def test_thing():
            import my_cool_project
    >       assert my_cool_project.does_everything()
    E       assert False
    E        +  where False = <function does_everything at 0x7f1c09a0e8c8>()
    E        +    where <function does_everything at 0x7f1c09a0e8c8> = <module 'my_cool_project' from '/src/my_cool_project/__init__.py'>.does_everything

    tests/test_all.py:3: AssertionError
    ====================== 1 failed in 0.02 seconds ============================
    $ nvim my_cool_project/__init__.py
    $ docker run --rm -it -v $(pwd):/src my-cool-image py.test /src
    ======================= test session starts ================================
    platform linux -- Python 3.5.2, pytest-3.0.4, py-1.4.31, pluggy-0.4.0
    rootdir: /src, inifile:
    collected 1 items

    tests/test_all.py .
    ====================== 1 passed in 0.01 seconds ============================

Happy hacking, folks!
