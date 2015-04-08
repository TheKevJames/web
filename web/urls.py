from django.conf.urls import patterns, url
from django.views.generic.base import RedirectView

from .views import home, projects, resource, robots, timeline
from hexclock.views import hexclock
from tracking.views import tracking, get_location
from webhome.views import webhome


urlpatterns = patterns(
    '',

    # config
    url(r'^robots\.txt$', robots),

    # base site
    url(r'^$', home),
    url(r'^projects$', projects),
    url(r'^resource$', resource),
    url(r'^timeline$', timeline),

    # hexclock
    url(r'^hexclock$', hexclock),

    # tracking
    url(r'^get_location$', get_location),
    url(r'^tracking$', tracking),

    # webhome
    url(r'^webhome$', webhome),

    # old links
    url(
        r'^blog/2010/11/new-tsa-motto/$',
        RedirectView.as_view(url='/', permanent=True)
    ),
)
