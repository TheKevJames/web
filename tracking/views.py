import json
import requests

from django.core.context_processors import csrf
from django.shortcuts import render_to_response
from django.http import HttpResponse

from .settings import MOVES_ACCESS_TOKEN, MOVES_REFRESH_TOKEN
from .settings import MOVES_CLIENT_ID, MOVES_CLIENT_SECRET
from .update_file import update


def tracking(request):
    resp = csrf(request)

    return render_to_response('tracking.html', resp)

def get_location(_request):
    def request_location(token=None):
        if not token:
            token = MOVES_ACCESS_TOKEN

        url = (
            'https://api.moves-app.com/api/1.1/user/places/daily?' +
            '&'.join([
                'pastDays=1',
                'access_token=' + token,
            ])
        )
        return requests.get(url)

    def request_keys():
        url = 'https://api.moves-app.com/oauth/v1/access_token'
        data = json.dumps({
            'grant_type': 'refresh_token',
            'refresh_token': MOVES_REFRESH_TOKEN,
            'client_id': MOVES_CLIENT_ID,
            'client_secret': MOVES_CLIENT_SECRET,
        })
        response = requests.post(url, data)

        access_token = response.json()['access_token']
        refresh_token = response.json()['refresh_token']
        update(
            'tracking/secrets.py',
            'MOVES_ACCESS_TOKEN',
            'MOVES_ACCESS_TOKEN = \'' + access_token + '\''
        )
        update(
            'tracking/secrets.py',
            'MOVES_REFRESH_TOKEN',
            'MOVES_REFRESH_TOKEN = \'' + refresh_token + '\''
        )

        return access_token


    response = request_location()
    if response.status_code != 200:
        token = request_keys()

        response = request_location(token)

    location_data = response.json()[0]['segments'][0]['place']
    response = json.dumps({
        'lat': location_data['location']['lat'],
        'lng': location_data['location']['lon'],
        'name': location_data['name'],
    })

    return HttpResponse(response, content_type='application/json')
