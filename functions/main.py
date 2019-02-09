import os
from typing import Tuple

import flask

import sleekxmpp.xmlstream.cert
sleekxmpp.xmlstream.cert.HAVE_PYASN1 = False
import sucks


API_TOKEN = os.environ['API_TOKEN']
SUCKS_CONTINENT = 'na'
SUCKS_COUNTRY = 'us'
SUCKS_DEVICE_ID = os.environ['SUCKS_DEVICE_ID']
SUCKS_EMAIL = os.environ['SUCKS_EMAIL']
SUCKS_PASSWORD_HASH = os.environ['SUCKS_PASSWORD_HASH']


def tucker_run(req: flask.Request) -> Tuple[str, int]:
    if not req.method == 'POST':
        return 'request must be POST', 415

    body = req.get_json(silent=True)
    if not body or body['token'] != API_TOKEN:
        return 'bad or missing auth', 403

    api = sucks.EcoVacsAPI(SUCKS_DEVICE_ID, SUCKS_EMAIL, SUCKS_PASSWORD_HASH,
                           SUCKS_COUNTRY, SUCKS_CONTINENT)
    tucker = api.devices()[0]
    vacbot = sucks.VacBot(api.uid, api.REALM, api.resource,
                          api.user_access_token, tucker, SUCKS_CONTINENT)
    vacbot.connect_and_wait_until_ready()

    vacbot.run(sucks.Clean())
    return 'ok', 200


def tucker_stop(req: flask.Request) -> Tuple[str, int]:
    if not req.method == 'POST':
        return 'request must be POST', 415

    body = req.get_json(silent=True)
    if not body or body['token'] != API_TOKEN:
        return 'bad or missing auth', 403

    api = sucks.EcoVacsAPI(SUCKS_DEVICE_ID, SUCKS_EMAIL, SUCKS_PASSWORD_HASH,
                           SUCKS_COUNTRY, SUCKS_CONTINENT)
    tucker = api.devices()[0]
    vacbot = sucks.VacBot(api.uid, api.REALM, api.resource,
                          api.user_access_token, tucker, SUCKS_CONTINENT)
    vacbot.connect_and_wait_until_ready()

    vacbot.run(sucks.Charge())
    return 'ok', 200
