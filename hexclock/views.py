from django.core.context_processors import csrf
from django.shortcuts import render_to_response


def hexclock(request):
    return render_to_response("hexclock.html", csrf(request))
