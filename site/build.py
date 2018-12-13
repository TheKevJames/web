#!/usr/bin/env python
import collections
import itertools
import operator
import pathlib
import typing

import flask
import flask_flatpages
import flask_frozen


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
POSTS_BY_TAG: typing.Dict[str, typing.Any] = collections.defaultdict(list)
for post in POSTS:
    for t in post.meta['tags'].split(', '):
        POSTS_BY_TAG[t].append(post)
POSTS_BY_YEAR_GROUPED = itertools.groupby(
    POSTS, key=lambda x: x['date'].year)  # type: ignore
POSTS_BY_YEAR = {k: list(v) for k, v in POSTS_BY_YEAR_GROUPED}

REVIEWS = sorted(reviewpages, key=operator.itemgetter('date'), reverse=True)
REVIEWS_BY_RATING: typing.Dict[str, list] = collections.defaultdict(list)
for review in sorted(REVIEWS, key=lambda x: x.meta['rating'], reverse=True):
    REVIEWS_BY_RATING[review.meta['rating']].append(review)
# TODO: nest subtags and accordion-ify
REVIEWS_BY_TAG: typing.Dict[str, typing.Any] = collections.defaultdict(list)
for review in REVIEWS:
    for t in review.meta['tags'].split(', '):
        REVIEWS_BY_TAG[t].append(review)
        subtags = [i for i, x in enumerate(t) if x == '>']
        for i in subtags:
            REVIEWS_BY_TAG[t[:i].strip()].append(review)


@app.route('/')  # type: ignore
def index() -> typing.Any:
    return flask.render_template('index.html')


@app.route('/blog/')  # type: ignore
def blog() -> typing.Any:
    return flask.render_template(
        'blog.html', by_date=POSTS_BY_YEAR, by_tag=POSTS_BY_TAG,
        filter_tag=None, recent=POSTS[:6])


@app.route('/blog/<tag>.html')  # type: ignore
def blog_tagged(tag: str) -> typing.Any:
    tag = tag.replace('_', ' ')
    if not POSTS_BY_TAG.get(tag):
        flask.abort(404)

    return flask.render_template(
        'blog.html', by_date=POSTS_BY_YEAR, by_tag=POSTS_BY_TAG,
        filter_tag=tag, recent=POSTS_BY_TAG[tag])


@app.route('/blog/<name>/')  # type: ignore
def blog_post(name: str) -> typing.Any:
    post = blogpages.get_or_404(name)
    post.meta['tag_list'] = post.meta['tags'].split(', ')
    return flask.render_template('post.html', post=post)


# TODO: reviews rss?
@app.route('/feed.xml')  # type: ignore
def blog_rss() -> typing.Any:
    for post in POSTS:
        post.meta['description'] = post.meta.get('description', post.body)
        post.meta['pub_date'] = post.meta['date'].strftime(
            '%a, %d %b %Y 12:%M:%S GMT')

    feed = flask.render_template('feed.xml', posts=POSTS[:10])
    response = flask.make_response(feed)
    response.headers['Content-Type'] = 'application/xml'
    return response


@app.route('/reviews/')  # type: ignore
def reviews() -> typing.Any:
    return flask.render_template(
        'reviews.html', by_rating=REVIEWS_BY_RATING, by_tag=REVIEWS_BY_TAG,
        filter_tag=None, recent=REVIEWS[:8])


@app.route('/reviews/<tag>.html')  # type: ignore
def reviews_tagged(tag: str) -> typing.Any:
    tag = tag.replace('_', ' ')
    if not REVIEWS_BY_TAG.get(tag):
        flask.abort(404)

    return flask.render_template(
        'reviews.html', by_rating=REVIEWS_BY_RATING, by_tag=REVIEWS_BY_TAG,
        filter_tag=tag, recent=sorted(REVIEWS_BY_TAG[tag],
                                      key=operator.itemgetter('title')))


@app.route('/reviews/<name>/')  # type: ignore
def review_page(name: str) -> typing.Any:
    review = reviewpages.get_or_404(name)
    review.meta['tag_list'] = review.meta['tags'].split(', ')
    return flask.render_template('review.html', review=review)


@freezer.register_generator  # type: ignore
def frozen_flatpages() -> typing.Iterable[typing.Tuple[str, dict]]:
    pages = pathlib.Path(__file__).resolve().parents[0] / 'pages'
    for name in (pages / 'blog').iterdir():
        yield 'blog_post', {'name': name.stem}
    for name in (pages / 'reviews').iterdir():
        yield 'review_page', {'name': name.stem}


@app.route('/404.html')  # type: ignore
def err404() -> typing.Any:
    return flask.render_template('404.html')


@app.route('/ping')  # type: ignore
def ping() -> str:
    return 'ok'


if __name__ == '__main__':
    freezer.freeze()
