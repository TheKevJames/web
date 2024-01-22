title: Effective Mentorship
tags: Technology
      Leadership
description: Some rambling about effective mentorship, as I see it

It's annual performance review season again here at `$company` and personal
growth is on my mind. As a tech lead -- and a fairly recent one at that -- I
don't claim to be an expert in being an effective mentor. Honestly, I don't
even claim to be particularly *decent* at it; it has been my pleasure to watch
many of the folks on my team grow a whole bunch in the last year and beyond,
but that speaks a whole lot more to their own thirst for new knowledge than
anything in particular I've done.

This post is mostly an attempt to get my thoughts in order about the whole
"mentorship" thing -- expect a whole lot more in the way of scattered thoughts
than well-argued central theme. I'm focusing mostly on the individual level of
mentorship here; so far my advice on mentoring entire teams pretty much amounts
to "do all of this, but more; also, you probably need to delegate a bit
rather than try to do it all yourself". I'll try to keep the
engineering-specific thoughts light, but all this comes from my background as a
software engineering tech lead so I make no promises that any of this is
applicable to, or comprehensible to, any other field.

### The View from 35,000 Feet

Overall, many of the approaches I've picked up in developing my mentorship
skills focus on where I've seen things go *wrong* and tries to work around
those issues. I think with mentorship, as with most skills, it's a whole lot
easier to point at things which went wrong and fix them rather than come up
with entirely new ideas or remember all the small details; when thinking about
the best mentors I've had, I certainly find it difficult to pick out the exact
reasons behind why I learned the most from them. My hope is that by focusing
efforts this way (and occasionally trying out new methods and keeping 'em /
changing 'em as necessary) I'll hill-climb myself into doing a good job here.

I've tried to focus on outlining what I consider to be the most important
things to consider here, ie. I've basically outlined the *opposite* of things
I've seen go poorly. For brevity, I'm also going to word things as "you should
do..." rather than including a disclaimer in every second sentence. See above:
I definitely don't know what I'm doing and you should take all this advice with
a heaping pile of salt.

### Do As I Say, Not As I Do... No, Wait, That's Not It

The first thing I try to keep in mind is to veer away from being overly
proscriptive; as a mentor, your job is not to provide the solution to any given
problem but rather to help your teammate develop the tools and mindset which
will let them solve this problem on their own in the future -- and, ideally,
different problems as well. If you provide just the solution without helping
them gain the right tools then you'd better plan to keep doing what you're
doing for the long term since they're never going to learn anything from that
except "when I have a problem, go get `$mentor` to solve it for me".

In a lot of ways, being a mentor is a lot like being an automation engineer: to
some degree, your job is to make your own job irrelevant.

That's not to say that you can never "give them the answer" -- a junior
engineer working with some new (to them) system is almost certainly not going
to tease out all the issues of which someone more experienced in that field
would be aware. There are some places you can give hints ("how would this scale
to `n` users? `100n`?") -- and in those cases, you absolutely should! -- but
that's not always going to be so simple.

Personally, I mostly find this to work on a gradient (or maybe two,
simultaneous gradients?) related to the depth of knowledge of the skill(s) at
play. As your teammate becomes more and more capable with the relevant skills,
you should slowly shift how you are mentoring them. Broadly speaking, I find
you need to do two things:

* increase the proportion of investigations versus solutions
* make the investigations more meta

On one extreme, you have entirely new skills. At the point, mentorship is more
focused around giving your teammate a grounding in the field; at no point as a
mentor should you ever *not explain your reasoning*, but this is the point
where "just giving them the answer" is most reasonable. This is completely new
territory: there must be some specific solutions built up before your teammate
will have enough understanding to discuss the more abstract.

Once they have some grounding in the space, that's where things get a bit more
interesting! Whereas before you might have been saying things along the lines
of "let's talk about how we can implement `$solution`", now you should be
heading for the next level of meta: "given `$options`, let's talk about the
things to consider in picking the right one".

As skills grow, you'll keep heading up this chain:

* "given `$problem`, what we should consider in coming up with good solutions?"
* "given `$requirements`, how can we track down which problems we need to
  solve?"
* "given `$goal`, how would we know the specific requirements?"
* et cetera...

Within each of the "levels of this chain", there's a whole lot of room for
variation. There's a lot of factors which might go into a question like "what
we should consider in coming up with good solutions" and no one ever learns
everything the first time through. You're probably going to do a whole lot of
passes through this list with differing focuses, variations on approach, and
for different skills.

How much you focus on the proportion of abstract thought vs specific solutions
is somewhat a two-dimensional function of what level the discussion is and how
many passes through the list you've done together.

If you're working on an entirely new skill or if you've never gone through the
list before, you should aim for a larger percentage of specifics -- as you get
further from those limits, you should increase the focus on abstract reasoning.

#### Code Ninja, Software Wizard, or Assembly Guru?

One of the things I've not yet talked about is job title / years of experience
/ seniority / whatever. To some extent, I think this "just sorts itself out"
with my thoughts above -- as a general rule, most teams will generally trust
those on the team with more experience to work on the bigger, harder, more
important, and less well-defined problems. In that case, a more junior engineer
will be given relatively fewer projects which require learning that last step
of "`$goal` -> requirements" and instead have more tasks focusing on repeating
the earlier steps with different variations. Similarly, since they won't be
doing all that many passes through the list, they'll be focusing a bit more on
the concrete than the abstract.

That... is pretty much what we'd want, I think, and it's what I've seen be
successful. Skills tend to work best when they're pyramid shaped -- when the
foundations have been examined many times from many angles and each layer is
built after the previous one is mostly solid. Note how I said "mostly solid"
there rather than "done" -- you don't need to paint the first floor of your
house before building the roof, but you do need the walls to be pretty much
complete.

Similarly: it's likely (dare I say "guaranteed") that there are multiple skills
related to any given problem. The average of all of those skills is an
interesting data point to consider -- if the average is high, you can afford to
be more abstract and focus on relating the lowest skill to the others. If the
average is low, more concrete work on the foundations is probably warranted.

### Dress for the Job You Want, Not the One You Have

An important aspect of mentorship is knowing where the mentee is aiming to be.
I don't mean this in terms of "where do you see yourself in ten years", but
rather a bit more near-term than that. Are they a SWE2 looking to get bumped up
to SWE3? Are they trying to broaden their horizons towards a different career
path? Improving their skills at their current role?

Whatever the answer is, there should exist some "rubric" (I hate this word,
more on that later) of what's expected of where they are now and how they're
doing compared to that, as well as something similar for their target next
position. At a smaller company, this might not be formalized, at a larger
company it might be over-formalized, but either way there's *something* that
you and your mentee can look at and use to base your judgments.

I don't mean this in the performance evaluation sense and the word "rubric"
implies some sort of grading system that I don't think is really relevant here.
What's important is to be able to come up with areas of focus to answer two
questions:

* how can the mentee get better at their current role?
* what can they improve at to get better at their next role?

The ideal mentorship scenario explores a bit of both. In fact, it explores a
bit of both in a varying ratio that shifts over time... does this description
sounds familiar?

> *Every company is different and the following advice may or may not have
> anything whatsoever to do with how your company does things. YMMV.*

A lot of tech companies, at least, have an IC ladder that looks something like
this: "to get promoted to job title "X+1", you must be filling 90% of the
requirements for your current title (ie. "X") as well as at least 50% of the
requirements for title "X+1". Exact numbers may vary, yada yada, you saw my
disclaimer.

How I read that is that when someone starts in a new role they are meant to
already know/fulfill 50% of that role but likely very little of the next role.
Over time, they are meant to learn >=40% of their current role and >=50% of
their next role. Almost certainly, the idea would be to focus a bit more on the
current role before setting sights on the next one.

That plays into this idea of gradual shifts perfectly: at first, most of your
mentorship should be aimed at fitting the current role. After some time, that
should start shifting to be closer to half-and-half current role and next role.
By the time your mentee is getting close to a promotion, you should be mostly
focusing on skills related to that new role (since you've already built the
foundations...).

It's all related, eh?

If you're in the sort of situation where there's not too much in the way of
formalized requirements here, this section might be trickier than otherwise --
but I want to stress that this doesn't have to be related to the specific
requirements of the titles at your company. As a mentor, you're probably
working at some level above entry-level. You probably have an idea in mind of
the sort of skill progression it takes to get from there to where you are --
and maybe / hopefully even a level or two further. You can probably stack rank
a good chunk of those skills. Worst case? Go with your gut, write it down, and
chat with your teammates about what they think.

#### In the Real World, Other People Dress You

These sub-headers are really getting away from me...

What I mean to say is that it's not always the case that your teammate is going
to be assigned to exact right proportion of the right kinds of work for them to
be working on things following the mentorship progression I've been outlining.
If you do have any input in their task assignments -- great! If you can have
their work shift over time in order to make sure they're shoring up their
foundations, regularly getting new things to work on just a bit outside their
skill level, and working on the sort of tasks that will promote the skills they
need to build up, you absolutely should.

If not, you need to be a bit crafty here.

So long as the task assignment is somewhat appropriate to their level (eg. some
amount of work at their level, some a bit above it; some stuff they already
know, some stuff they don't), you can reorder your plans to accommodate that.
There's a lot of room for going "out of order" here -- I genuinely can't
imagine coming up with a mentorship curriculum with some pre-defined order and
having that actually work out with no hiccups. If you can pull that off...
damn. Power to you. Drop me a message and let me know how you did it!

I mentioned "stack ranking" your mentee's current and target skills above -- I
think that requirement goes double in cases like this. At any given point in
time, there's probably a whole bunch of different things you can focus on to
varying degrees; different skills at different levels and of varying
importance, but all worth exploring.

As an engineer, it took me a while to accept that focusing on lower priority or
less important skills first, while "sub-optimal" from one perspective, might be
perfectly reasonable. Sometimes there are company-level reasons for why we
might want folks to work on certain things, sometimes it's a burnout or
interest thing, sometimes it's a timing issue... taken all together, playing
with the order like this might be less sub-optimal than you think.

That said, I can't know what your situation is -- it could also be simple
oversight or something along those lines! If you think your mentee isn't being
given the work they need in order to grow, your friendly neighbourhood tech
lead / project manager / agile coach / waterfall guru / scrum battle-emperor
may just not be aware of the issue.

To some extent, you can work around this -- even if the mentee is not being
given "stretch goal" type work, you can always chat a bit about what that
improvement *could* look like -- but my advice definitely starts to run dry at
this point. If you or your teammates are not regularly able to work on things
which expand your horizons, you may not be set up to succeed as a mentor.

### Who's in Charge Here?

I've talked a lot about how *you* should determine upon which skills to focus,
*you* should determine what the important skills are, *you* should ensure their
work follows their goals for new skills but it's not just about you, it's also
about your teammate. You can only ever see how mentorship is going from your
side, but you're not the one who should be getting the most out of this
relationship.

<strike>That puts us in a tough situation, since you have to become really good
at guessing what your teammate is thinking and</strike> -- I'm kidding, of
course: this whole mentorship thing is a two-way street, *just ask them*.
Building up the sort of relationship where thoughts flow in both directions and
this becomes more of a dialog than an info session is pretty much the whole
point of mentorship; without that relationship, it'd just be called "teaching".

There's two main components of this relationship which I think are worth diving
in to: growing rapport and grabbing a pulse.

I'm not going to speak too much to the former other than to comment on its
importance -- at the end of the day, your teammate will always learn best if
the two of you get along well, if you've learned to speak in ways the other
understands, if there's mutual respect, et cetera. To a large extent, there's a
time component to this one and it'll just take some warming up to each other
before everything goes smoothly. For more specifics... I don't know, maybe
"How to Win Friends and Influence People" might be of interest?

The pulse check is something I can speak to a bit more. Once you have a decent
rapport built up, you can start using that to help get a good idea of which
sorts of things to work on. There's probably some things you can pick up from
the outside, but hearing straight from your teammate that they'd like to work
on some specific skill is invaluable.

Note that this can be (and should be) both short-term and long-term. Sometimes
the two can even be related to each other! But overall the point here is to get
an idea of your teammate's goals (of varying durations) and work together on
figuring out how to improve at them. By the very nature of a mentor-mentee
relationship, it's likely the case that one of you has a better grasp of the
mentee's skills and goals and the other has a better grasp of how to improve at
them.

No points for guessing who knows what.

As a mentor, learning this information is *incredibly* valuable. Given you have
a larger amount of experience, you may be aware of skills the mentee needs but
is not yet aware of -- and you can't ignore those -- but there's a lot of
information to pull from the places you overlap.

Does your mentee think they need to focus on the same specific as you? Great,
that means you know you're aligned and don't need to spend as much time selling
why the skill is one to focus on.

Did they pick a different specific skill than you but in the same wheelhouse?
That might mean they don't know what they don't know, eg. that you two should
explore that wheelhouse a bit more and talk about why you'd want to prioritize
some skills over others.

Did they pick something entirely different than what you were thinking? Maybe
it's time to take a step back and talk about which skills are the most
important to have first -- this could be an awareness issue like I mentioned
above, but this could also point to a lack of understanding of the importance
of a given skill or a lack of interest/motivation. The most successful
mentoring occurs when both sides are in sync.

In a lot of cases, just asking "what do you want to improve?" and "how can I
help" can be enough.

#### When "How Can I Help?" Isn't Enough

Your teammate isn't always going to know what they need. They're not always
going to know what they don't know or what they should work on next. Learning
what they're thinking of working on next is a useful piece of the puzzle, but
it isn't an end-all-be-all.

As with anything, you need to take all the sources of information and knowledge
you can, mash them together, and work with the final product. Sometimes that
might mean focusing on the skills your teammate has identified as being a
priority and other times you might need to take a more proactive stance and
work on something else entirely.

In the end, it's the unknown unknowns which matter here: no one person can know
everything and it's entirely possible that one might not know what they should
focus on next or might be focusing on the wrong priorities. It's great to get
more input in these sorts of things; I love "360 Reviews" and other similar
approaches for gathering insights from a wide range of people in order to help
turn these into known unknowns (and eventually into, er... known knowns...?).
If you and/or your mentee are unusure what to work on, why not ask around?

#### A Variety of Spice is the Spice of a Well-Stocked Kitchen

It's also worth noting that sometimes it's perfectly fine to not know the
"next, highest priority skill" to learn. There's something to be said for
variety in helping minds stay well-oiled and interested: varying the skills
you're focusing on between breadth and depth and between different aspects of
your job can be a breath of fresh air.

I don't mean to say you should be flighty here and pick a different skill to
"focus" on every day. As with everything, moderation is important. If you're
having trouble picking the next important thing, or if your teammate has been
working on the same thing for long enough to start getting fatigued, why not
throw a bunch of new ideas in a hat and flip a coin? Their attention span will
thank you.

### When's the Right Time for Mentoring?

When isn't?

Seriously though, if you think of mentoring as something which happens only on
some specific cadence during its assigned timeslot, you're missing a whole lot
of its most valuable aspects. Mentorship is about the mindset behind things;
it's about the personal growth which might be *fueled* by any mentor-mentee
meetings but should not be the exclusive domain of those meetings. It's about
continuously sharing your thought patterns with your teammate -- and you are
interested in continuous personal growth, right?

There's never going to be enough hours in the day to train another person on
every single thing they'd like to learn, let alone only the ones directly
applicable to their position. This comes back to the mentoring vs delegating
thing again: if a teammate is gaining new skills only in this one specific
scenario then all they're really learning is "when I see something new, go have
`$mentor` tell me what to do".

This can be a decent *starting point* in a new relationship, but should never
be the end goal. Fundamentally, mentoring is about teaching the general rather
than the specific, the mindset rather than the individual thoughts. Following
that thought to the end means you should be teaching your teammate to gain
these new skills on their own, to continually be learning. The end goal should
be to turn yourself into a fallback, a sounding board, a resource your teammate
uses rather than someone going through a curriculum with them.

And (cue glib ending), if all goes well, eventually they won't even need you
for that -- that's when you'll know you've succeeded.
