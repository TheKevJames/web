import collections
import datetime
import json
import math
import pathlib
import sys

import geopy.geocoders
import plotly.express


CACHE_DATA = pathlib.Path(__file__).parent / 'data.cache'
CACHE_LATLNG = pathlib.Path(__file__).parent / 'latlng.cache'


def latlng(
    cache_latlng: dict[str, tuple[float, float]],
    x: str,
) -> tuple[float, float]:
    if cache_latlng.get(x):
        return cache_latlng[x]

    loc = geopy.geocoders.Nominatim(user_agent='site').geocode(x)
    cache_latlng[x] = (loc.latitude, loc.longitude)
    return (loc.latitude, loc.longitude)


def format_data(totals: dict[str, int]) -> list[dict[str, object]]:
    with CACHE_LATLNG.open(encoding='utf-8') as f:
        cache_latlng = json.load(f)

    data = []
    for location, days in totals.items():
        lat, lng = latlng(cache_latlng, location)
        value = math.log1p(days) + 1.0
        data.append({'loc': location, 'lat': lat, 'lon': lng, 'val': value})

    with CACHE_LATLNG.open('w', encoding='utf-8') as f:
        json.dump(cache_latlng, f)

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
        delta = (
            datetime.date.fromisoformat(end)
            - datetime.date.fromisoformat(start)
        )
        totals[place] += delta.days

    return format_data(totals)


def cache() -> None:
    source = sys.argv[1]
    data = load(source)
    with CACHE_DATA.open('w', encoding='utf-8') as f:
        json.dump(data, f)


def draw() -> None:
    with CACHE_DATA.open(encoding='utf-8') as f:
        data = json.load(f)

    fig = plotly.express.scatter_geo(
        data, lat='lat', lon='lon', size_max=20,
        size='val', height=1080, width=1920,
        projection='natural earth',
    )

    images = pathlib.Path(__file__).parents[1] / 'build' / 'img'
    images.mkdir(exist_ok=True)
    fig.write_image(images / 'travel.svg')
