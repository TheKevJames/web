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
from raven.contrib.flask import Sentry


FLATPAGES_EXTENSION = '.md'


logging.basicConfig(format='%(asctime)-15s %(levelname)-6s %(message)s')

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


# TODO: investigate flask-frozen
app = Flask(__name__, static_url_path='')
flatpages = FlatPages(app)
app.config.from_object(__name__)
sentry = Sentry(app, logging=True, level=logging.WARNING)


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


if __name__ == '__main__':
    app.run(host='0.0.0.0')
