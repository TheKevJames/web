#!/usr/bin/env python
from __future__ import print_function

import json
import requests
import sys

from flask import Flask, redirect, url_for


# pylint: disable=C0301
MOVES_ACCESS_TOKEN = '9tXcrsYuvn74nst27GobrJ_uvj1YYMJ9dfLaB0Y7vg919pOC51aiS3WE3NVFBdqU'
MOVES_CLIENT_ID = 'XYet1ivrVF9gn2it0yV8zOTWL9ADJ38p'
MOVES_CLIENT_SECRET = 'Q24PXPcprhURQU8Io_BU9k9xc2hn9VQUVt_epyDFuAT55rc2YE86n20kE0TLXR3Q'
MOVES_REFRESH_TOKEN = 'WlxZ0vW4w8sJqcmEFduxoh2ghDICQEoQ3igm8LrwE085M551ud3RvEkeCczE9Hc9'


def refresh():
    url = 'https://api.moves-app.com/oauth/v1/access_token'
    data = json.dumps({
        'grant_type': 'refresh_token',
        'client_id': MOVES_CLIENT_ID,
        'client_secret': MOVES_CLIENT_SECRET,
        'refresh_token': MOVES_REFRESH_TOKEN,
    })
    response = requests.post(url, data)

    access_token = response.json()['access_token']
    print('New access token: %s' % access_token, file=sys.stderr)

    refresh_token = response.json()['refresh_token']
    print('New refresh_token token: %s' % refresh_token, file=sys.stderr)

    return access_token


app = Flask(__name__, static_url_path='')


@app.route('/')
def index():
    return redirect(url_for('static', filename='index.html'))

@app.route('/hexclock')
def hexclock():
    return redirect(url_for('static', filename='hexclock.html'))

@app.route('/moves-api')
def moves_api():
    url = lambda token: 'https://api.moves-app.com/api/1.1/user/places/daily?pastDays=%s&access_token=%s' % (
        2,
        token
    )

    response = requests.get(url(MOVES_ACCESS_TOKEN))
    if response.status_code != 200:
        new_token = refresh()

        response = requests.get(url(new_token))

    location_data = response.json()[0]['segments'][0]['place']
    return json.dumps({
        'lat': location_data['location']['lat'],
        'lng': location_data['location']['lon'],
        'name': location_data['name'],
    })


if __name__ == '__main__':
    app.run(debug=True)
