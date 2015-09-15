#!/usr/bin/env python
from __future__ import print_function

import json
import os
import requests
import sys

from flask import Flask, redirect, url_for


MOVES_URL = 'https://api.moves-app.com'


def refresh():
    url = '%s/oauth/v1/access_token' % MOVES_URL
    data = json.dumps({
        'grant_type': 'refresh_token',
        'client_id': os.environ['MOVES_CLIENT_ID'],
        'client_secret': os.environ['MOVES_CLIENT_SECRET'],
        'refresh_token': os.environ['MOVES_REFRESH_TOKEN'],
    })
    response = requests.post(url, data)

    access_token = response.json()['access_token']
    os.environ['MOVES_ACCESS_TOKEN'] = access_token
    print('New Moves access token: %s' % access_token, file=sys.stderr)

    refresh_token = response.json()['refresh_token']
    os.environ['MOVES_REFRESH_TOKEN'] = refresh_token
    print('New Moves refresh_token token: %s' % refresh_token, file=sys.stderr)

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
    url = lambda token: '%s/api/1.1/user/places/daily?pastDays=%s&access_token=%s' % (
        MOVES_URL,
        2,
        token
    )

    response = requests.get(url(os.environ['MOVES_ACCESS_TOKEN']))
    if response.status_code != 200:
        new_token = refresh()

        response = requests.get(url(new_token))

    location_data = response.json()[-1]['segments'][-1]['place']
    return json.dumps({
        'lat': location_data['location']['lat'],
        'lng': location_data['location']['lon'],
        'name': location_data['name'],
    })


if __name__ == '__main__':
    app.run(debug=True)
