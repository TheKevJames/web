from django.conf.urls import patterns, url

from web.views import home, projects, resource, timeline
from webhome.views import webhome


urlpatterns = patterns('',
	(r'^favicon\.ico$', 'django.views.generic.simple.redirect_to', {'url': '/static/images/favicon.ico'}),

	url(r'^$', home),
	url(r'^projects$', projects),
	url(r'^resource$', resource),
	url(r'^timeline$', timeline),

	url(r'^webhome$', webhome),
)
