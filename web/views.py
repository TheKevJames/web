from os.path import isfile

from django.core.context_processors import csrf
from django.shortcuts import render_to_response

import vanity


def home(request):
	return render_to_response("index.html", csrf(request))

def projects(request):
	resp = csrf(request)
	resp.update({'almostempty': vanity.downloads_total('almost-empty', False)})

	return render_to_response("projects.html", resp)

def resource(request):
	resp = csrf(request)

	if isfile('static/resources/' + request.GET.keys()[0] + '.pdf'):
		resp.update({'type': 'pdf', 'load': request.GET.keys()[0]})
		return render_to_response("resource.html", resp)
	elif isfile('static/resources/' + request.GET.keys()[0] + '.png'):
		resp.update({'type': 'png', 'load': request.GET.keys()[0]})
		return render_to_response("resource.html", resp)
	else:
		resp.update({'type': 'other', 'load': request.GET.keys()[0]})
		return render_to_response("resource.html", resp)

def timeline(request):
	return render_to_response("timeline.html", csrf(request))
