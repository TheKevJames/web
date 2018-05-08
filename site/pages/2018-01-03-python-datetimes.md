title: A Guide to Python Datetimes
date: 2018-01-03
tags: Technology
description: Wherein I try to once-and-for-all solve Python timezone issues.

After a harrowing journey of debugging datetime issues in Python, I've decided
to solve this once-and-for-all (or at least give myself a resource for the next
_n_ times I have to deal with this). Here's what you (read: I) need to know.

There are three datetime formats to be aware of in Python:

- `struct_time` (*naive*)
- `POSIX` (*aware*)
- `datetime` (*naive* or *aware*)

This can be further broken into six datetime states:

- `struct_time` (local)
- `struct_time` (UTC)
- `POSIX`
- Aware `datetime` (Python 2)
- Aware `datetime` (Python 3)
- Naive `datetime` (local)
- Naive `datetime` (UTC)

To get the current time in any of the above formats, run:

| To Get This | Do This |
|-------------|---------|
| `struct_time` (local) | `time.localtime()` |
| `struct_time` (UTC) | `time.gmtime()` |
| `POSIX` | `time.time()` |
| Aware `datetime` (Py2) | `datetime.datetime.now(pytz.timezone('UTC'))` |
| Aware `datetime` (Py3) | `datetime.datetime.now(datetime.timezone.utc)` |
| Naive `datetime` (local) | `datetime.datetime.now()` |
| Naive `datetime` (UTC) | `datetime.datetime.utcnow()` |

Note that Python 2 support for timezones is a bit lacking, as you can see
above. To bridge the gap, you'll likely need to install the `tzlocal` and
`pytz` modules (`python2 -m pip install pytz tzlocal`).

To convert between datetime formats, use the following table. You can find the
code for generating this table
[on my GitHub](https://github.com/TheKevJames/experiments/tree/master/python-datetimes).
Pull requests for any other direct conversion methods I've missed are gladly
accepted -- note, though, that the below table attempts to avoid redundancy;
sometimes you'll need to convert through intermediate formats:

| Row -> Col | `POSIX` | `struct_time` (local) | `struct_time` (UTC) | Naive `datetime` (local) | Naive `datetime` (UTC) | Aware `datetime` (Py2) | Aware `datetime` (Py3) |
|----|-----|-----|-----|-----|-----|-----|-----|
| `POSIX` | - | `time.localtime(x)` | `time.gmtime(x)` | `datetime.datetime.fromtimestamp(x)` | `datetime.datetime.utcfromtimestamp(x)` | `datetime.datetime.fromtimestamp(x, pytz.timezone('UTC'))` | `datetime.datetime.fromtimestamp(x, datetime.timezone.utc)` |
| `struct_time` (local) | `time.mktime(x)` | - | - | `datetime.datetime(*x[:6])` | - | - | - |
| `struct_time` (UTC) | `calendar.timegm(x)` | - | - | - | `datetime.datetime(*x[:6])` | `datetime.datetime(*x[:6], tzinfo=pytz.timezone('UTC'))` | `datetime.datetime(*x[:6], tzinfo=datetime.timezone.utc)` |
| Naive `datetime` (local) | - | - | - | - | - | `x.replace(tzinfo=tzlocal.get_localzone())` | `x.astimezone()` |
| Naive `datetime` (UTC) | `calendar.timegm(x.utctimetuple())` | - | `x.utctimetuple()` | - | - | `x.replace(tzinfo=pytz.timezone('UTC'))` | `x.replace(tzinfo=datetime.timezone.utc)` |
| Aware `datetime` (Py2) | `calendar.timegm(x.utctimetuple())` | - | `x.utctimetuple()` | `x.astimezone(tzlocal.get_localzone()).replace(tzinfo=None)` | `x.astimezone(pytz.timezone('UTC')).replace(tzinfo=None)` | - | - |
| Aware `datetime` (Py3) | `calendar.timegm(x.utctimetuple())` | - | `x.utctimetuple()` | `x.astimezone().replace(tzinfo=None)` | `x.astimezone(datetime.timezone.utc).replace(tzinfo=None)` | - | - |

I've used UTC as the standard timezone when converting to / creating aware
`datetime` entities, but you can use any other timezone you'd like. To convert
between timezones with aware `datetime` entities, you can do:

- Python 2: `x.astimezone(pytz.timezone('UTC')); x.astimezone(pytz.timezone('US/Pacific'))`
- Python 3: `x.astimezone(datetime.timezone.utc); x.astimezone(datetime.timezone(datetime.timedelta(hours=-8)))`
