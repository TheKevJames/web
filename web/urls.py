from django.conf.urls import patterns, url

from web.views import home, projects, resource, timeline
from webhome.views import webhome


urlpatterns = patterns('',
    (r'^favicon\.ico$', 'django.views.generic.simple.redirect_to',
        {'url': '/static/images/favicon.ico'}),
    (r'^robots\.txt$', 'django.views.generic.simple.direct_to_template',
        {'template': 'robots.txt', 'mimetype': 'text/plain'}),
    (r'^sitemap\.xml$', 'django.views.generic.simple.direct_to_template',
        {'template': 'sitemap.xml', 'mimetype': 'text/xml'}),

    url(r'^$', home),
    url(r'^projects$', projects),
    url(r'^resource$', resource),
    url(r'^timeline$', timeline),

    url(r'^webhome$', webhome),
)
