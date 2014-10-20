from datetime import timedelta
from dateutil.parser import parse
from json import loads
from urllib import urlencode
from urllib2 import urlopen


access_token = 'a36iD236Kp1NCRQ3IHT6H_XC9ubNJTw5N41OS0jLH7rV5m87jKtQr4WfkQjywpo4'
refresh_token = 'HVs0WWydtlBJlc3YLnUIsUPWR__bfcjqTPDzUmPzMeXY0hm7UKv9JhWAhCS_LBP7'
# user_id = 48925718342127696
client_id = 'XYet1ivrVF9gn2it0yV8zOTWL9ADJ38p'
client_secret = 'Q24PXPcprhURQU8Io_BU9k9xc2hn9VQUVt_epyDFuAT55rc2YE86n20kE0TLXR3Q'


def get_location():
    def get_activity(segment):
        data = None
        try:
            data = segment.get('place').get('name')
            return ('location', data)
        except AttributeError:
            data = segment.get('activities')[0].get('activity')
            return ('activity', data)

    def get_time(segment):
        location_offset = -timedelta(0, 60 * 60 * 4)

        start = parse(segment.get('startTime')) + location_offset
        end = parse(segment.get('endTime')) + location_offset

        if start.day < end.day:
            start = start.replace(hour=20, minute=0, second=0)

        hours = (end - start).seconds / 3600.0
        if hours < 1:
            return 1
        elif hours < 2:
            return 2
        else:
            return 3

    url = 'https://api.moves-app.com/api/1.1/user/storyline/daily'
    url += '?' + urlencode({
        'pastDays': 1,
        'track_points': 'true',
        'access_token': access_token
    })

    content = loads(urlopen(url).read())[0]
    segments = content.get('segments') or []

    response = []
    for segment in segments:
        activity = get_activity(segment)
        time = get_time(segment) * 50

        response.append({
            'type': activity[0],
            'time': time,
            'data': activity[1]
        })

    return response


# if fails:
#     data = [
#         ('grant_type': 'refresh_token'),
#         ('refresh_token': refresh_token),
#         ('client_id': client_id),
#         ('client_secret': client_secret)
#     ]

#     urlopen(
#         'https://api.moves-app.com/oauth/v1/access_token',
#         urlencode(data)
#     )
