from os.path import isfile
from threading import Thread
from random import sample

import vanity

from django.core.context_processors import csrf
from django.shortcuts import render_to_response

from .update_file import update
from .vanity_data import VANITY_ALMOSTEMPTY, VANITY_PACKTEX


QUOTES = {
    '"Be better than you were yesterday."',
    '"Failure is not an option. It\'s bundled with your software."',
    '"Life is about kicking ass, not kissing it."',
    '"Live forever or die trying."',
    '"Tail Recursion is its own reward."',
    '"Treat each day as your last; one day you\'ll be right."',
    '"The master has failed more times than the beginner has even tried."',
}

def home(request):
    resp = csrf(request)

    quote = sample(QUOTES, 1)[0]
    resp.update({'quote': quote})

    return render_to_response('index.html', resp)

def projects(request):
    def update_vanity_data():
        almostempty = vanity.downloads_total('almost-empty', False)
        update(
            'web/vanity_data.py',
            'VANITY_ALMOSTEMPTY',
            'VANITY_ALMOSTEMPTY = ' + str(almostempty)
        )

        packtex = vanity.downloads_total('packtex', False)
        update(
            'web/vanity_data.py',
            'VANITY_PACKTEX',
            'VANITY_PACKTEX = ' + str(packtex)
        )


    resp = csrf(request)

    thread = Thread(target=update_vanity_data)
    thread.daemon = True
    thread.start()

    resp.update({'almostempty': VANITY_ALMOSTEMPTY})
    resp.update({'packtex': VANITY_PACKTEX})

    return render_to_response('projects.html', resp)

def resource(request):
    resp = csrf(request)

    params = request.GET.keys()
    if not params:
        return home(request)

    filename = params[0]
    resp.update({'load': filename})
    if isfile('static/resources/' + filename):
        resp.update({'type': filename[-3:]})
    else:
        resp.update({'type': 'foreign_' + filename[-3:]})

    return render_to_response('resource.html', resp)

def robots(request):
    return render_to_response(
        'robots.txt',
        csrf(request),
        content_type='text/plain'
    )

def timeline(request):
    return render_to_response('timeline.html', csrf(request))
