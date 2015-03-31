from django.conf.urls import patterns, url

from .views import home, projects, resource, timeline
from hexclock.views import hexclock
from tracking.views import tracking, get_location
from webhome.views import webhome


urlpatterns = patterns(
    '',

    url(r'^$', home),
    url(r'^projects$', projects),
    url(r'^resource$', resource),
    url(r'^timeline$', timeline),

    url(r'^hexclock$', hexclock),

    url(r'^get_location$', get_location),
    url(r'^tracking$', tracking),

    url(r'^webhome$', webhome),
)
