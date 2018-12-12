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
freezer = flask_frozen.Freezer(app)


BLOGS = sorted(blogpages, key=operator.itemgetter('date'), reverse=True)
BLOGS_BY_TAG: typing.Dict[str, typing.Any] = collections.defaultdict(list)
for blog in BLOGS:
    for t in blog.meta['tags'].split(', '):
        BLOGS_BY_TAG[t].append(blog)
BLOGS_BY_YEAR_GROUPED = itertools.groupby(
    BLOGS, key=lambda x: x['date'].year)  # type: ignore
BLOGS_BY_YEAR = {k: list(v) for k, v in BLOGS_BY_YEAR_GROUPED}


@app.route('/')  # type: ignore
def index() -> typing.Any:
    return flask.render_template('index.html')


@app.route('/blog/')  # type: ignore
def blog() -> typing.Any:
    return flask.render_template('blog.html', by_date=BLOGS_BY_YEAR,
                                 by_tag=BLOGS_BY_TAG, filter_tag=None,
                                 recent=BLOGS[:6])


@app.route('/blog/<tag>.html')  # type: ignore
def blog_tagged(tag: str) -> typing.Any:
    tag = tag.replace('_', ' ')
    if not BLOGS_BY_TAG.get(tag):
        flask.abort(404)

    return flask.render_template('blog.html', by_date=BLOGS_BY_YEAR,
                                 by_tag=BLOGS_BY_TAG, filter_tag=tag,
                                 recent=BLOGS_BY_TAG[tag])


@app.route('/blog/<name>/')  # type: ignore
def blog_page(name: str) -> typing.Any:
    post = blogpages.get_or_404(name)
    post.meta['tag_list'] = post.meta['tags'].split(', ')
    return flask.render_template('post.html', post=post)


@freezer.register_generator  # type: ignore
def blog_pages() -> typing.Iterable[typing.Tuple[str, dict]]:
    pages = pathlib.Path(__file__).resolve().parents[0] / 'pages' / 'blog'
    for name in pages.iterdir():
        yield 'blog_page', {'name': name.stem}


@app.route('/feed.xml')  # type: ignore
def blog_rss() -> typing.Any:
    for post in BLOGS:
        post.meta['description'] = post.meta.get('description', post.body)
        post.meta['pub_date'] = post.meta['date'].strftime(
            '%a, %d %b %Y 12:%M:%S GMT')

    feed = flask.render_template('feed.xml', posts=BLOGS[:10])
    response = flask.make_response(feed)
    response.headers['Content-Type'] = 'application/xml'
    return response


@app.route('/404.html')  # type: ignore
def err404() -> typing.Any:
    return flask.render_template('404.html')


@app.route('/ping')  # type: ignore
def ping() -> str:
    return 'ok'


if __name__ == '__main__':
    freezer.freeze()
