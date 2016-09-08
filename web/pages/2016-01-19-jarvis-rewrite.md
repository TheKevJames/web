title: Jarvis, More Over-Engineered Than Ever Before
date: 2016-01-19

I first introduced Jarvis in [a blog post](/blog/2015-10-17-jarvis) almost
three months ago. Since then, he's undergone a few upgrades.

He was originally hacked together as a series of modules that "magically"
worked together. Now, don't get me wrong, he did exactly what I wanted him to
do. Building new plugins was super simple: drop a python file in his plugins
directory and he'd scan through and install them at startup. So long as they
had a few specific functions, everything would "just work".

Like I say, he did exactly what I wanted him to... originally. But I have big
plans for him and it was starting to get unwieldy to [make him do what I wanted
him to do the way I wanted him to do it](https://youtu.be/b1xnSRjPscI?t=22s).

Enter the magic of Python and metaprogramming.

Now, many of my friends already know how much I love Python. They also may have
heard me cackling wildly as I implemented the new Jarvis re-design. Here's why:

> In Python, all functions are first-class objects.

Not impressed yet? Fair enough, there are plenty of languages which can make
the same claim. That's OK, we'll get there.

One of the cool things about treating functions as objects is you can do
object-ey things with them, for example:

    #!python
    def i_am_a_function(arg0, arg1):
        do_something()

    i_am_a_function.is_an_object = 'Absolutely true'

And given that everything is duck-typed in Python, things like attributes on
functions can be whatever we want them to be.

_Another_ cool thing we can do with functions, since they're first class, is to
pass them to each other. In addition to passing them around as normal
parameters, eg.

    #!python
    def bar(fn):
        fn()
        print 'bar'

    def foo():
        print 'foo',

    bar(foo)  # prints 'foo bar'

Python also allows us to use special
[decorator](https://wiki.python.org/moin/PythonDecorators) syntax. If we were
to re-write the previous example with decorators, we'd have:

    #!python
    def bar(fn):
        fn()
        print 'bar'

    @bar
    def foo():
        print 'foo',

    foo()  # also prints 'foo bar'

There are a few big advantages to this, as I see it. The fact that the caller
doesn't need to know which functions to chain and in what order is a big one,
but even more important is that we are beginning to develop a framework for
doing some very fun things.

Now, let's put those two tidbits together to come up with something cool.
Here's a snippet from Jarvis, of the class from which all Plugins inherit.

    #!python
    class Plugin(object):
        # snip

        @staticmethod
        def on_message(msg):
            def on_message_decorator(func):
                func.regex = re.compile(msg)
                return func
            return on_message_decorator

        # snip

See what's going on here? We've defined a function, which takes some parameter
and returns a different function with an attribute set to the regex compiled
form of that parameter. In other words, `on_message` is a decorator which can
be applied to a function which accepts a single parameter (the decorator, not
the function); the decorator will then store some data on a new attribute in
the wrapped function.

That's all well and good, but how do we use that?

First I need to explain a bit about metaclasses: now, in addition to functions
being objects, classes are also objects. [Just as other objects are instances
of a particular class, classes themselves are instances of a
metaclass](https://en.wikibooks.org/wiki/Python_Programming/Metaclasses).

What does this mean? Well, it means that by subclassing from `type` (the base /
default metaclass), we can change how classes are instantiated.

In Jarvis, we have

    #!python
    class PluginMetaclass(type):
        def __new__(mcs, name, bases, namespace, **_kwargs):
            result = type.__new__(mcs, name, bases, dict(namespace))
            result.response_fns = [fn for fn in sorted(namespace.values())
                                   if hasattr(fn, 'regex')]
            return result

    class Plugin(object):
        __metaclass__ = PluginMetaclass

        # snip

This metaclass really doesn't do much, only one line besides calling its
parent. But that one line is the basis of all the magic.

In our metaclass, we define the `response_fns` member of the resulting class as
a list of all functions of that class with the 'regex' attribute set. Recall
this is the attribute we set in our decorator.

Since the `__new__` function is called as the class is instantiated, the
resulting class object will always have this attribute set.

Finally, we define a method in which our base class can make use of this new
attribute:

    #!python
    class Plugin(object):
        # snip

        def respond(self, ch, user, msg):
            for fn in self.response_fns:
                regex_match = fn.regex.match(msg)
                if not regex_match:
                    continue

                fn(self, ch, user, regex_match.groups())

        # snip

What have we done here? Basically, we've defined a function that, when called,
will search through all methods of that class which have the 'regex' attribute
set, attempt to apply the regex, and call the method only if a match is found.

This allows us to -- very easily -- define plugins which listen and respond to
specific phrases. How easily? Well...

    #!python
    class CashPool(Plugin):
        @Plugin.on_message(r'(.*) (\w+) sent \$([\d\.]+) to ([, \w]+)\.?')
        def send_money(self, ch, user, groups):
            # snip

The above function listens for any instances of users sending money to each
other, recognizes the event, and splits the event into groups (eg. from_user,
to_user, value, etc)... all before even calling the function. Writing new
plugins is now incredibly simple, all of the template-ey message-parsing work
can be done in a single line.

And if that's not cool, I don't know what is.

Jarvis lives [on my Github](https://github.com/TheKevJames/jarvis) and is very
proud to be celebrating his
[first birthday](https://github.com/TheKevJames/jarvis/releases/tag/1.0.0). As
always, I'm happy to see contributions in any form!

<div class='prev-post'><a href='/blog/2015-10-17-jarvis'>Jarvis, a Slack-bot
Which Does Far Too Much</a></div>
