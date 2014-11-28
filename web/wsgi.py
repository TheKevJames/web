import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "web.settings")

from .settings import BASE_DIR, ENVIRONMENT
import newrelic.agent
newrelic.agent.initialize(os.path.join(BASE_DIR, 'newrelic.ini'), ENVIRONMENT)

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
