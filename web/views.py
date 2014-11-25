from os.path import isfile
from random import sample

from django.core.context_processors import csrf
from django.shortcuts import render_to_response

# import vanity


QUOTES = {
    '"Life is about kicking ass, not kissing it."',
    '"Live forever or die trying."',
    '"Tail Recursion is its own reward."'
}

def home(request):
    resp = csrf(request)

    quote = sample(QUOTES, 1)[0]
    resp.update({'quote': quote})

    return render_to_response("index.html", resp)

def projects(request):
    resp = csrf(request)
    # resp.update({'almostempty': vanity.downloads_total('almost-empty', False)})
    resp.update({'almostempty': '8744'})
    # resp.update({'packtex': vanity.downloads_total('packtex', False)})
    resp.update({'packtex': '4456'})

    return render_to_response("projects.html", resp)

def resource(request):
    resp = csrf(request)

    filename = request.GET.keys()[0]
    resp.update({'load': filename})
    if isfile('static/resources/' + filename):
        resp.update({'type': filename[-3:]})
    else:
        resp.update({'type': 'other'})

    return render_to_response("resource.html", resp)

def timeline(request):
    return render_to_response("timeline.html", csrf(request))
