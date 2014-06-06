from os.path import isfile

from django.core.context_processors import csrf
from django.shortcuts import render_to_response

# import vanity


def home(request):
    return render_to_response("index.html", csrf(request))

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
