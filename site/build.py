#!/usr/bin/env python3
import operator
import pathlib
from typing import Any
from typing import Dict
from typing import Iterable
from typing import Tuple

import flask
import flask_flatpages
import flask_frozen
from utils import collect_by_key
from utils import collect_by_tags


app = flask.Flask(__name__, static_url_path='')
app.config.update(
    FLATPAGES_BLOG_EXTENSION='.md',
    FLATPAGES_BLOG_MARKDOWN_EXTENSIONS=['codehilite', 'tables'],
    FLATPAGES_BLOG_ROOT='pages/blog',
    FLATPAGES_REVIEWS_EXTENSION='.md',
    FLATPAGES_REVIEWS_MARKDOWN_EXTENSIONS=[],
    FLATPAGES_REVIEWS_ROOT='pages/reviews',
)
app.config.update(
    FREEZER_BASE_URL='https://thekev.in/',
    FREEZER_DEFAULT_MIMETYPE='text/html',
    FREEZER_IGNORE_404_NOT_FOUND=False,
    FREEZER_RELATIVE_URLS=True,
    FREEZER_REMOVE_EXTRA_FILES=True,
    FREEZER_STATIC_IGNORE=['.git*'],
)
blogpages = flask_flatpages.FlatPages(app, name='blog')
reviewpages = flask_flatpages.FlatPages(app, name='reviews')
freezer = flask_frozen.Freezer(app)


POSTS = sorted(blogpages, key=operator.itemgetter('date'), reverse=True)
POSTS_BY_TAG = collect_by_tags(POSTS)
POSTS_BY_YEAR = collect_by_key(POSTS, key=lambda x: x['date'].year)

REVIEWS = sorted(reviewpages, key=operator.itemgetter('date'), reverse=True)
REVIEWS_BY_RATING = collect_by_key(REVIEWS, key=lambda x: x.meta['rating'])
REVIEWS_BY_TAG = collect_by_tags(REVIEWS)


@app.route('/')
def index() -> Any:
    return flask.render_template('index.html')


@app.route('/blog/')
def blog() -> Any:
    return flask.render_template(
        'blog.html', by_date=POSTS_BY_YEAR, by_tag=POSTS_BY_TAG,
        filter_tag=None, recent=POSTS[:6])


@app.route('/blog/<tag>.html')
def blog_tagged(tag: str) -> Any:
    tag = tag.replace('_', ' ')
    if not POSTS_BY_TAG.get(tag):
        flask.abort(404)

    return flask.render_template(
        'blog.html', by_date=POSTS_BY_YEAR, by_tag=POSTS_BY_TAG,
        filter_tag=tag, recent=POSTS_BY_TAG[tag])


@app.route('/blog/<name>/')
def blog_post(name: str) -> Any:
    post = blogpages.get_or_404(name)
    post.meta['tag_list'] = post.meta['tags'].split(', ')
    return flask.render_template('post.html', post=post)


# TODO: reviews rss?
@app.route('/feed.xml')
def blog_rss() -> Any:
    for post in POSTS:
        post.meta['description'] = post.meta.get('description', post.body)
        post.meta['pub_date'] = post.meta['date'].strftime(
            '%a, %d %b %Y 12:%M:%S GMT')

    feed = flask.render_template('feed.xml', posts=POSTS[:10])
    response = flask.make_response(feed)
    response.headers['Content-Type'] = 'application/xml'
    return response


@app.route('/reviews/')
def reviews() -> Any:
    return flask.render_template(
        'reviews.html', by_rating=REVIEWS_BY_RATING, by_tag=REVIEWS_BY_TAG,
        filter_tag=None, recent=REVIEWS[:8])


@app.route('/reviews/<tag>.html')
def reviews_tagged(tag: str) -> Any:
    tag = tag.replace('_', ' ')
    if not REVIEWS_BY_TAG.get(tag):
        flask.abort(404)

    return flask.render_template(
        'reviews.html', by_rating=REVIEWS_BY_RATING, by_tag=REVIEWS_BY_TAG,
        filter_tag=tag, recent=sorted(REVIEWS_BY_TAG[tag],
                                      key=operator.itemgetter('title')))


@app.route('/reviews/<name>/')
def review_page(name: str) -> Any:
    review = reviewpages.get_or_404(name)
    review.meta['tag_list'] = review.meta['tags'].split(', ')
    return flask.render_template('review.html', review=review)


@freezer.register_generator  # type: ignore
def frozen_flatpages() -> Iterable[Tuple[str, Dict[str, str]]]:
    pages = pathlib.Path(__file__).resolve().parents[0] / 'pages'
    for name in (pages / 'blog').iterdir():
        yield 'blog_post', {'name': name.stem}
    for name in (pages / 'reviews').iterdir():
        yield 'review_page', {'name': name.stem}


@app.route('/404.html')
def err404() -> Any:
    return flask.render_template('404.html')


@app.route('/ping')
def ping() -> str:
    return 'ok'


# https://tools.ietf.org/html/draft-foudil-securitytxt-05
@app.route('/.well-known/security.txt')
def security() -> Any:
    return flask.redirect(flask.url_for('static', filename='security.txt'))


if __name__ == '__main__':
    freezer.freeze()
