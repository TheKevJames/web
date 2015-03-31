import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'web.settings')

from .settings import NEW_RELIC_LICENSE_KEY
os.environ["NEW_RELIC_LICENSE_KEY"] = NEW_RELIC_LICENSE_KEY

import newrelic.agent
from .settings import BASE_DIR, ENVIRONMENT
newrelic.agent.initialize(os.path.join(BASE_DIR, 'newrelic.ini'), ENVIRONMENT)

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
