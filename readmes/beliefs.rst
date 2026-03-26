Beliefs.README
==============

The README serves as a repository of the North Star beliefs which guide my
decision-making processes. As a general rule, when presented with any
engineering problem, the following ideas tend to be the ones in my mind as I
craft a solution.

Summary
-------

I've worked with and without Agile, Scrum, Waterfall, and blah-blah-blah other
systems. At the end of the day, I care less about the framework and much more
about the following:

- I value speed of development -- including proactive efforts such as
  writing/improving tests, refactoring legacy systems, and dissemination of
  knowledge either through pairing or improving documentation.

- I value learning -- exploring new ideas, trying new
  methods/libraries/systems, and being willing to discard and prune exploratory
  code once we settle into something which works. Re-exploring the status quo
  semi-regularly, especially with regards to legacy systems and pain points, is
  a fantastic way to build a reliable and easy-to-work-with system.

- I value our time as employees -- automating our workflows, simplifying our
  systems, pruning unnecessary meetings, etc. are all fantastic ways to give us
  the time to *actually do our jobs* rather than talk about doing them.

- I value doing things right rather than quick -- cutting corners now is an
  excellent way to have more work to do next week.

More Specifics
--------------

Larger Concepts
~~~~~~~~~~~~~~~

`Laziness, Impatience, and Hubris`_ are the three virtues that make a
programmer great according to Larry Wall, the original author of Perl.

* **Laziness**: The quality that makes you go to great effort to reduce overall
  energy expenditure. It makes you write labor-saving programs that other
  people will find useful and document what you wrote so you don't have to
  answer so many questions about it.
* **Impatience**: The anger you feel when the computer is being lazy. This
  makes you write programs that don't just react to your needs, but actually
  anticipate them. Or at least pretend to.
* **Hubris**: The quality that makes you write (and maintain) programs that
  other people won't want to say bad things about.

The `Zen of Python`_ is some Python philosophy by Tim Peters, a long time
Python contributor. It can definitely be applied to other languages too!

.. code-block::

    Beautiful is better than ugly.
    Explicit is better than implicit.
    Simple is better than complex.
    Complex is better than complicated.
    Flat is better than nested.
    Sparse is better than dense.
    Readability counts.
    Special cases aren't special enough to break the rules.
    Although practicality beats purity.
    Errors should never pass silently.
    Unless explicitly silenced.
    In the face of ambiguity, refuse the temptation to guess.
    There should be one-- and preferably only one --obvious way to do it.
    Although that way may not be obvious at first unless you're Dutch.
    Now is better than never.
    Although never is often better than *right* now.
    If the implementation is hard to explain, it's a bad idea.
    If the implementation is easy to explain, it may be a good idea.
    Namespaces are one honking great idea -- let's do more of those!

Heroku has some principles about designing apps and distributed systems, which
they call the `Twelve-Factor App`_. The framing of their write-up is a bit
outdated, but the principles hold true.

1. **Codebase**: one codebase per app
1. **Dependencies**: explicitly declare and isolate dependencies
1. **Config**: store config in the environment
1. **Backing Services**: treat backing services as attached resources
1. **Build, Release, and Run**: separate build and run stages
1. **Processes**: execute an app as one or more stateless processes
1. **Port Binding**: export services via port binding
1. **Concurrency**: scale out via the process model
1. **Disposability**: maximize fast startup and graceful shutdown
1. **Dev/Prod Parity**: development, staging, and prod should be identical
1. **Logs**: treat logs as event streams
1. **Admin Processes**: run admin tasks as one-off processes

Bite Size
~~~~~~~~~

**Grepability**. Basically, whenever possible, write code in such a way that it
is easy to search with ``grep``.

**Follow the standards**. If there's a PEP for it, be it code formatting,
builtin usage, or whatever, that PEP is probably worth following, unless
there's a really good reason.

**Constraints are advantages**. Small teams, tight budgets, and limited scope
force better decisions.

**Ignore feature requests**. Don't build what users ask for; understand the
underlying problem instead.

**Ship early, ship often**. A half-product that's real beats a perfect product
that's vaporware.

**Epicenter design**. Start with the core interface/interaction, not the edges
(nav, footer, etc).

**Say no by default**. Every feature has a hidden cost: complexity,
maintenance, edge cases...

.. _Laziness, Impatience, and Hubris: https://thethreevirtues.com/
.. _The Zen of Python: https://peps.python.org/pep-0020/
.. _Twelve-Factor App: https://12factor.net/
