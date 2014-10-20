from django.db import models


class Health(models.Model):
    time = models.DateTimeField(unique=True)
    heart_rate = models.IntegerField()
    weight = models.FloatField()
    bmi = models.FloatField()


class Location(models.Model):
    time = models.DateTimeField(unique=True)
    longitude = models.FloatField(default=0)
    latitude = models.FloatField(default=0)
