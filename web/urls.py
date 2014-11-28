from django.conf.urls import patterns, url
from django.views.generic import TemplateView

from web.views import home, projects, resource, timeline

from hexclock.views import hexclock
from tracking.views import tracking
from webhome.views import webhome


urlpatterns = patterns(
    '',
    (
        r'^robots\.txt$',
        TemplateView.as_view(
            template_name='robots.txt',
            content_type='text/plain'
        )
    ),
    (
        r'^sitemap\.xml$',
        TemplateView.as_view(
            template_name='sitemap.xml',
            content_type='text/xml'
        )
    ),

    url(r'^$', home),
    url(r'^projects$', projects),
    url(r'^resource$', resource),
    url(r'^timeline$', timeline),

    url(r'^hexclock$', hexclock),
    url(r'^tracking$', tracking),
    url(r'^webhome$', webhome),
)
