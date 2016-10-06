#!/usr/bin/env python
from __future__ import print_function

from collections import deque, OrderedDict
import json
import logging
import operator
import os

import requests

from flask import Flask, make_response, render_template, request, url_for
from flask_flatpages import FlatPages


FLATPAGES_EXTENSION = '.md'
MOVES_URL = 'https://api.moves-app.com'
MOVES_URL_DAILY = '{}/api/1.1/user/places/daily'.format(MOVES_URL)
MOVES_URL_OAUTH = '{}/oauth/v1/access_token'.format(MOVES_URL)

MOVES_ACCESS_TOKEN = os.environ['MOVES_ACCESS_TOKEN']
MOVES_CLIENT_ID = os.environ['MOVES_CLIENT_ID']
MOVES_CLIENT_SECRET = os.environ['MOVES_CLIENT_SECRET']
MOVES_REFRESH_TOKEN = os.environ['MOVES_REFRESH_TOKEN']


logging.basicConfig(format='%(asctime)-15s %(levelname)-6s %(message)s')

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


def write_token(response):
    logger.info('Writing new access token')
    access_token = response.json()['access_token']
    refresh_token = response.json()['refresh_token']

    os.environ['MOVES_ACCESS_TOKEN'] = access_token
    os.environ['MOVES_REFRESH_TOKEN'] = refresh_token

    with open('/new_tokens.key', 'w') as f:
        f.write('MOVES_ACCESS_TOKEN={}'.format(access_token))
        f.write('MOVES_REFRESH_TOKEN={}'.format(refresh_token))

    logger.info('Wrote new access token')
    return access_token

def refresh():
    logger.info('Refreshing Moves API token')
    data = json.dumps({
        'grant_type': 'refresh_token',
        'client_id': MOVES_CLIENT_ID,
        'client_secret': MOVES_CLIENT_SECRET,
        'refresh_token': MOVES_REFRESH_TOKEN,
    })
    response = requests.post(MOVES_URL_OAUTH, data)
    logger.info('Got response: %s %s', response.status_code,
                str(response.json()))

    access_token = write_token(response)
    return access_token


# TODO: investigate flask-frozen
app = Flask(__name__, static_url_path='')
flatpages = FlatPages(app)
app.config.from_object(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/blog')
def blog():
    posts = [p for p in flatpages]
    posts.sort(key=operator.itemgetter('date'), reverse=True)

    indexed = OrderedDict()
    for post in posts:
        if post['date'].year not in indexed:
            indexed[post['date'].year] = deque()
        indexed[post['date'].year].appendleft(post)

    return render_template('blog.html', indexed=indexed, posts=posts)

@app.route('/blog/<name>/')
def blog_page(name):
    post = flatpages.get_or_404(name)
    return render_template(url_for('static', filename='post.html'), post=post)

@app.route('/feed.xml')
def blog_rss():
    posts = [p for p in flatpages]
    posts.sort(key=operator.itemgetter('date'))
    for post in posts:
        post.meta['pub_date'] = post.meta['date'].strftime(
            '%a, %d %b %Y 12:%M:%S GMT')

        if not 'description' in post.meta:
            post.meta['description'] = post.body

    feed = render_template('feed.xml', posts=posts[-10:])
    response = make_response(feed)
    response.headers['Content-Type'] = 'application/xml'
    return response

@app.route('/hexclock')
def hexclock():
    return render_template('hexclock.html')

@app.route('/ping')
def ping():
    return 'ok'

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/moves-api')
def moves_api(code=None):
    def get_url(token, num_days=2):
        return '{}?pastDays={}&access_token={}'.format(
            MOVES_URL_DAILY, num_days, token)

    # https://api.moves-app.com/oauth/v1/authorize?response_type=code&client_id
    # =xxx&scope=activity%20location
    code = request.args.get('code')
    if code:
        logger.info('Authenticating new Moves integration')
        data = json.dumps({
            'grant_type': 'authorization_code',
            'code': code,
            'client_id': MOVES_CLIENT_ID,
            'client_secret': MOVES_CLIENT_SECRET,
            'redirect_uri': 'http://thekev.in/moves-api',
        })
        response = requests.post(MOVES_URL_OAUTH, data)
        if response.status_code != 200:
            logger.warning('Could not authenticate with Moves API: %s %s',
                           response.status_code, str(response.json()))
            return

        write_token(response)
        logger.info('Successfully authenticated new Moves token')
        return

    response = requests.get(get_url(os.environ['MOVES_ACCESS_TOKEN']))
    if response.status_code != 200:
        logger.info('Moves API request failed, regenerating access token...')
        new_token = refresh()

        logger.info('Replaying request with new token')
        response = requests.get(get_url(new_token))
        logger.info('Got response: %s %s', response.status_code,
                    str(response.json()))

    location_data = response.json()[-1]['segments'][-1]['place']
    return json.dumps({
        'lat': location_data['location']['lat'],
        'lng': location_data['location']['lon'],
        'name': location_data['name'],
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0')
