import collections
from typing import Any
from typing import Callable
from typing import Dict
from typing import List
from typing import TypeVar


T = TypeVar('T')


# TODO: key returns a str
def collect_by_key(items: List[T], *,
                   key: Callable[[T], Any]) -> Dict[str, List[T]]:
    by_key: Dict[str, List[T]] = collections.defaultdict(list)
    for review in sorted(items, key=key, reverse=True):
        by_key[key(review)].append(review)

    return by_key


def collect_by_tags(items: List[Any]) -> Dict[str, List[Any]]:
    # TODO: nest subtags and accordion-ify
    by_tag: Dict[str, List[Any]] = collections.defaultdict(list)
    for item in items:
        for t in item.meta['tags'].split(', '):
            by_tag[t].append(item)
            subtags = [i for i, x in enumerate(t) if x == '>']
            for i in subtags:
                by_tag[t[:i].strip()].append(item)

    return by_tag
