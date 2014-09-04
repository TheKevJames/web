from django.conf.urls import patterns, url
from django.views.generic import TemplateView

from web.views import home, projects, resource, timeline

from hexclock.views import hexclock
from webhome.views import webhome


urlpatterns = patterns('',
    (r'^favicon\.ico$', 'django.views.generic.simple.redirect_to',
        {'url': '/static/images/favicon.ico'}),
    (r'^robots\.txt$', TemplateView.as_view(template_name='robots.txt', content_type='text/plain')),
    (r'^sitemap\.xml$', TemplateView.as_view(template_name='sitemap.xml', content_type='text/xml')),

    url(r'^$', home),
    url(r'^projects$', projects),
    url(r'^resource$', resource),
    url(r'^timeline$', timeline),

    url(r'^hexclock$', hexclock),
    url(r'^webhome$', webhome),
)
