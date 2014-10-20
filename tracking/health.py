import datetime
from dateutil.tz import tzlocal

from django.db import transaction

from tracking.models import Health


def update_heart_rate(rate):
    with transaction.atomic():
        current = Health.objects.latest('id')

        new = Health(
            time=datetime.datetime.now(tzlocal()),
            heart_rate=rate,
            weight=current.weight,
            bmi=current.bmi
        )
        new.save()


def update_weight(weight):
    # weight must be in pounds
    with transaction.atomic():
        current = Health.objects.latest('id')

        new = Health(
            time=datetime.datetime.now(tzlocal()),
            heart_rate=current.heart_rate,
            weight=weight,
            bmi=weight*703.0/4900.0
        )
        new.save()


def get_health():
    current = Health.objects.latest('id')

    age = datetime.datetime.now() - datetime.datetime(1994, 06, 07, 0, 1, 0)
    years = (
        age.days +
        age.seconds / 86400.0 +
        age.microseconds / 31556926000000.0
    ) / 365.242199
    return (
        round(years, 8),
        current.heart_rate,
        round(current.weight, 1),
        round(current.bmi, 3)
    )
