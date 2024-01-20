import collections
import datetime
import json
import math
import pathlib

import geocoder
import plotly.express


CACHE_DATA = pathlib.Path(__file__).parent / 'data.cache'
CACHE_LATLNG = pathlib.Path(__file__).parent / 'latlng.cache'


def latlng(cache: dict[str, tuple[float, float]],
           x: str) -> tuple[float, float]:
    if cache.get(x):
        return cache[x]

    lat, lng = geocoder.arcgis(x).latlng
    cache[x] = (lat, lng)
    return (lat, lng)


def format_data(totals: dict[str, int]) -> list[dict[str, object]]:
    with open(CACHE_LATLNG, encoding='utf-8') as f:
        cache = json.load(f)

    data = []
    for location, days in totals.items():
        lat, lng = latlng(cache, location)
        value = math.log1p(days) + 1.0
        data.append({'loc': location, 'lat': lat, 'lon': lng, 'val': value})

    with open(CACHE_LATLNG, 'w', encoding='utf-8') as f:
        json.dump(cache, f)

    return data


def load(fname: str) -> list[dict[str, object]]:
    with open(fname, encoding='utf-8') as f:
        raw = f.readlines()

    events = []
    for line in raw:
        if 'location' in line:
            date, line = line.split(' ', 1)
            *_, location = line.split('" "')
            location = location.strip('"\n')
            events.append((date, location))

    totals: dict[str, int] = collections.defaultdict(int)
    for lhs, rhs in zip(events, events[1:]):
        start, place = lhs
        end, _ = rhs

        # TODO: include places with frequent day trips?
        delta = (datetime.date.fromisoformat(end)
                 - datetime.date.fromisoformat(start))
        totals[place] += delta.days

    return format_data(totals)


def draw(source: str | None) -> None:
    if source:
        data = load(source)
        with open(CACHE_DATA, 'w', encoding='utf-8') as f:
            json.dump(data, f)
    else:
        with open(CACHE_DATA, encoding='utf-8') as f:
            data = json.load(f)

    fig = plotly.express.scatter_geo(data, lat='lat', lon='lon', size_max=20,
                                     size='val', height=1080, width=1920,
                                     projection='natural earth')

    images = pathlib.Path(__file__).parent / 'build' / 'img'
    images.mkdir(exist_ok=True)
    fig.write_image(images / 'travel.svg')
