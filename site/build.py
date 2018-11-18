#!/usr/bin/env python
import collections
import operator
import pathlib

import flask
import flask_flatpages
import flask_frozen


FLATPAGES_EXTENSION = '.md'
FLATPAGES_MARKDOWN_EXTENSIONS = ['codehilite', 'tables']
FREEZER_BASE_URL = 'https://thekev.in/'
FREEZER_DEFAULT_MIMETYPE = 'text/html'
FREEZER_IGNORE_404_NOT_FOUND = False
FREEZER_RELATIVE_URLS = True
FREEZER_REMOVE_EXTRA_FILES = True
FREEZER_STATIC_IGNORE = ['.git*']


app = flask.Flask(__name__, static_url_path='')
app.config.from_object(__name__)
flatpages = flask_flatpages.FlatPages(app)
freezer = flask_frozen.Freezer(app)


@app.route('/')
def index():
    return flask.render_template('index.html')


@app.route('/blog/')
def blog():
    posts = [p for p in flatpages]
    posts.sort(key=operator.itemgetter('date'), reverse=True)

    by_date = collections.OrderedDict()
    by_tag = {}
    for post in posts:
        for tag in post.meta.get('tags', '').split(', '):
            tag = tag or 'Untagged'
            by_tag[tag] = by_tag.get(tag, list())
            by_tag[tag].append(post)

        by_date[post['date'].year] = by_date.get(post['date'].year, list())
        by_date[post['date'].year].append(post)

    return flask.render_template('blog.html', by_date=by_date, by_tag=by_tag,
                                 filter_tag=None, recent=posts[:6])


@app.route('/blog/<tag>.html')
def blog_tagged(tag):
    posts = [p for p in flatpages]
    posts.sort(key=operator.itemgetter('date'), reverse=True)

    by_date = collections.OrderedDict()
    by_tag = collections.defaultdict(list)
    for post in posts:
        for t in post.meta.get('tags', '').split(', '):
            by_tag[t or 'Untagged'].append(post)

        by_date[post['date'].year] = by_date.get(post['date'].year, list())
        by_date[post['date'].year].append(post)

    tag = tag.replace('_', ' ')
    if not by_tag.get(tag):
        flask.abort(404)

    return flask.render_template('blog.html', by_date=by_date, by_tag=by_tag,
                                 filter_tag=tag, recent=by_tag[tag])


@app.route('/blog/<name>/')
def blog_page(name):
    post = flatpages.get_or_404(name)
    post.meta['tag_list'] = post.meta.get('tags', 'Untagged').split(', ')
    return flask.render_template('post.html', post=post)


@freezer.register_generator
def blog_pages():
    pages = pathlib.Path(__file__).resolve().parents[0] / 'pages'
    for name in pages.iterdir():
        yield 'blog_page', {'name': name.stem}


@app.route('/feed.xml')
def blog_rss():
    posts = [p for p in flatpages]
    posts.sort(key=operator.itemgetter('date'), reverse=True)
    for post in posts:
        post.meta['pub_date'] = post.meta['date'].strftime(
            '%a, %d %b %Y 12:%M:%S GMT')

        post.meta['description'] = post.meta.get('description', post.body)

    feed = flask.render_template('feed.xml', posts=posts[:10])
    response = flask.make_response(feed)
    response.headers['Content-Type'] = 'application/xml'
    return response


@app.route('/404.html')
def err404():
    return flask.render_template('404.html')


@app.route('/ping')
def ping():
    return 'ok'


if __name__ == '__main__':
    freezer.freeze()
