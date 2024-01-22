import dataclasses
import datetime
import itertools
import operator
import pathlib
from collections.abc import Iterator

import jinja2
import markdown


SITE_DIR = pathlib.Path(__file__).parents[1]


@dataclasses.dataclass
class Post:
    title: str
    date: datetime.date
    description: str
    html: str
    tags: list[str]

    fname: pathlib.Path

    @property
    def pub_date(self) -> str:
        return self.date.strftime('%a, %d %b %Y 12:%M:%S GMT')

    @property
    def pub_path(self) -> str:
        _, _, _, name = self.fname.with_suffix('').name.split('-', 3)
        return f'{self.date.year}/{name}.html'


def getyear(x: Post) -> str:
    return str(x.date.year)


def collect_by_tags(items: list[Post]) -> dict[str, list[Post]]:
    by_tag: dict[str, list[Post]] = {}
    for item in items:
        for tag in item.tags:
            by_tag.setdefault(tag, []).append(item)

    return by_tag


def parse_blog() -> Iterator[Post]:
    md = markdown.Markdown(
        extensions=[
            'markdown.extensions.codehilite',
            'markdown.extensions.meta',
            'markdown.extensions.tables',
        ],
    )

    for fname in (SITE_DIR / 'blog').glob('*.md'):
        raw = fname.read_text(encoding='utf-8')

        html = md.convert(raw)
        meta = md.Meta  # type: ignore[attr-defined]

        year, month, day, *_ = fname.name.split('-')
        date = datetime.date.fromisoformat(f'{year}-{month}-{day}')

        yield Post(
            date=date,
            description=meta.get('description', [''])[0],
            fname=fname,
            html=html,
            tags=meta['tags'],
            title=meta['title'][0],
        )
        md.reset()


def render() -> None:
    env = jinja2.Environment(
        autoescape=jinja2.select_autoescape(('html', 'xml')),
        loader=jinja2.FileSystemLoader('templates'),
    )
    build_dir = SITE_DIR / 'build'

    posts = list(parse_blog())
    for post in posts:
        template = env.get_template('post.html')
        fname = build_dir / 'blog' / post.pub_path
        fname.parent.mkdir(exist_ok=True)
        with fname.open('w', encoding='utf-8') as f:
            f.write(template.render(post=post))

    posts.sort(key=operator.attrgetter('date'), reverse=True)
    posts_by_tag = collect_by_tags(posts)
    context = {
        'by_date': {k: list(v) for k, v in itertools.groupby(posts, getyear)},
        'by_tag': posts_by_tag,
    }

    template = env.get_template('blog.html')
    with (build_dir / 'blog' / 'index.html').open('w', encoding='utf-8') as f:
        f.write(
            template.render(
                {'filter_tag': None, 'recent': posts[:6]} | context,
            ),
        )
    for tag, by_tag in posts_by_tag.items():
        fname = build_dir / 'blog' / f'{tag.replace(" ", "_")}.html'
        with fname.open('w', encoding='utf-8') as f:
            f.write(
                template.render(
                    {'filter_tag': tag, 'recent': by_tag} | context,
                ),
            )

    template = env.get_template('feed.xml')
    with (build_dir / 'feed.xml').open('w', encoding='utf-8') as f:
        f.write(template.render(posts=posts[:10]))

    for fbasename in (
        '404.html', 'cocktails.html', 'index.html',
        'publications.html', 'travel.html',
    ):
        template = env.get_template(fbasename)
        with (build_dir / fbasename).open('w', encoding='utf-8') as f:
            f.write(template.render())
