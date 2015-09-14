#!/usr/bin/env python
from __future__ import print_function

import json
import requests
import sys

from flask import Flask, redirect, url_for


# pylint: disable=C0301
MOVES_ACCESS_TOKEN = 'sxffDTAVHe8rLyrpFE5538eM9Bz6pIEsuu2TWCzkPPnp005apG6xOS276L_SMi1b'
MOVES_CLIENT_ID = 'ClTm26kPswAbYVbCXNb7UGeMm08qfT7K'
MOVES_CLIENT_SECRET = 'n46lWtEd2ZQUEcl4J74YoXj7Fpfew5506E4X_A0oF4if9UE2P2fgiV5xu0oubTw5'
MOVES_REFRESH_TOKEN = 'i2WK7WEB0iHJUPC66DOLz2Av0m3Sp7uiS13436p2hUx5Qy3Mmduz2wCe25WN73Cm'


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
    print('New Moves access token: %s' % access_token, file=sys.stderr)

    refresh_token = response.json()['refresh_token']
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
    url = lambda token: 'https://api.moves-app.com/api/1.1/user/places/daily?pastDays=%s&access_token=%s' % (
        2,
        token
    )

    response = requests.get(url(MOVES_ACCESS_TOKEN))
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
