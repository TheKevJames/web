from django.shortcuts import render_to_response


def home(request):
	return render_to_response("index.html")

def timeline(request):
	return render_to_response("timeline.html")

def resource(request):
	from os.path import isfile
	if isfile('static/resources/' + request.GET.keys()[0] + '.pdf'):
		return render_to_response("resource.html", {'type': 'pdf', 'load': request.GET.keys()[0]})
	elif isfile('static/resources/' + request.GET.keys()[0] + '.png'):
		return render_to_response("resource.html", {'type': 'png', 'load': request.GET.keys()[0]})
	else:
		return render_to_response("resource.html", {'type': 'other', 'load': request.GET.keys()[0]})