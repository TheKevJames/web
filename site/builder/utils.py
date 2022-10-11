import collections
from typing import Any
from typing import Callable
from typing import TypeVar


T = TypeVar('T')


# TODO: key returns a str
def collect_by_key(items: list[T], *,
                   key: Callable[[T], Any]) -> dict[str, list[T]]:
    by_key: dict[str, list[T]] = collections.defaultdict(list)
    for review in sorted(items, key=key, reverse=True):
        by_key[key(review)].append(review)

    return by_key


def collect_by_tags(items: list[Any]) -> dict[str, list[Any]]:
    # TODO: nest subtags and accordion-ify
    by_tag: dict[str, list[Any]] = collections.defaultdict(list)
    for item in items:
        for t in item.meta['tags'].split(', '):
            by_tag[t].append(item)
            for i, x in enumerate(t):
                if x == '>':
                    by_tag[t[:i].strip()].append(item)

    return by_tag
