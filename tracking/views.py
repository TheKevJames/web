from django.core.context_processors import csrf
from django.shortcuts import render_to_response

from tracking.health import get_health
from tracking.location import get_location


def tracking(request):
    params = csrf(request)

    age, heart_rate, weight, bmi = get_health()
    location = get_location()

    params.update({
        'age': age,
        'heart_rate': heart_rate,
        'weight': weight,
        'bmi': bmi,
        'location': location
    })

    return render_to_response("tracking.html", params)
