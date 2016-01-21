#!/usr/bin/env python
from __future__ import print_function

from collections import deque, OrderedDict
import json
import operator
import os
import sys

import requests

from flask import Flask, make_response, render_template, url_for
from flask_flatpages import FlatPages


FLATPAGES_EXTENSION = '.md'
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
            post.meta['description'] = post.meta['title']

    feed = render_template('feed.xml', posts=posts[-10:])
    response = make_response(feed)
    response.headers['Content-Type'] = 'application/xml'
    return response

@app.route('/hexclock')
def hexclock():
    return render_template('hexclock.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

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
