#!/usr/bin/env python3
import pathlib
import urllib.request


MUSIC = [
    ('Against the Current', '@againstthecurrent'),
    ('Book Club Radio', '@bookclubradio'),
    ('Chainsmokers', '@THECHAINSMOKERS'),
    ('Dylan Taylor', '@DylanTaylorDrums'),
    ('Epic Rap Battles of History', '@ERB'),
    ('Fueled By Ramen', '@fueledbyramen'),
    ('Jack Conte', '@Jackconte'),
    ('Kurt Hugo Schneider', '@KurtHugoSchneider'),
    ('Lonely Island', '@thelonelyisland'),
    ('Lukas Graham', '@LukasGraham'),
    ('Noah Guthrie', '@noahguthrie'),
    ('The Tech Thieves', '@TheTechThieves'),
    ('TheFatRat', '@TheFatRat'),
    ('Tony Ann', '@tonyannmusic'),
    ('Trap Nation', '@TrapNation'),
    ('Triple J', '@triplej'),
]

TEMPLATE_HEAD = """
<?xml version="1.0" encoding="UTF-8"?>
<opml version="1.0">
  <head>
    <title>{title}</title>
  </head>
  <body>
    <outline text="{title}" title="{title}">
"""
TEMPLATE_ITEM = """
      <outline text="{name}" title="{name}" type="rss" xmlUrl="{url}"
               htmlUrl="{html}"/>
"""
TEMPLATE_FOOT = """
    </outline>
  </body>
</opml>
"""


def main() -> None:
    fname = pathlib.Path(__file__).parent / 'music.xml'
    with fname.open('w', encoding='utf-8') as f:
        f.write(TEMPLATE_HEAD.format(title='Music').lstrip('\n'))
        for name, user in sorted(MUSIC):
            html = f'https://www.youtube.com/{user}'
            with urllib.request.urlopen(html) as resp:
                body = resp.read()
            _, body = body.split(
                b'<link rel="alternate" type="application/rss+xml" '
                b'title="RSS" href="',
            )
            xml, *_ = body.split(b'">')
            channel = xml.decode('utf-8')
            # filters out shorts
            videos = channel.replace('channel_id=UC', 'playlist_id=UULF')
            item = TEMPLATE_ITEM.format(
                name=name, html=html, url=videos,
            )
            f.write(item.lstrip('\n'))
        f.write(TEMPLATE_FOOT.lstrip('\n'))


if __name__ == '__main__':
    main()
