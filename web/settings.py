import os

try:
    # pylint: disable=unused-import
    from .secret import (
        ADMINS, MANAGERS,
        DATABASES,
        NEW_RELIC_LICENSE_KEY,
        SECRET_KEY,
        DEFAULT_FROM_EMAIL, SERVER_EMAIL,
        EMAIL_HOST, EMAIL_PORT,
        EMAIL_HOST_USER, EMAIL_HOST_PASSWORD,
        EMAIL_USE_SSL, EMAIL_USE_TLS,
    )
except ImportError:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(os.path.dirname(__file__), 'db.sqlite3'),
        }
    }

    SECRET_KEY = 'ThisKeyIsPubliclyViewableDoNotUseIt'

    NEW_RELIC_LICENSE_KEY = 'CouldNotLoadNewRelicKey'

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

ENVIRONMENT = 'development'

STATIC_ROOT = '/www/public_html/static/'

DEBUG = True
TEMPLATE_DEBUG = False

ALLOWED_HOSTS = [
    '0.0.0.0',
    '127.0.0.1',
    '.thekev.in',
    '.thekev.in.',
    'thekev.in'
]

INSTALLED_APPS = (
    'django.contrib.staticfiles',
    'hexclock',
    'tracking',
    'webhome',
)

MIDDLEWARE_CLASSES = (
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.common.BrokenLinkEmailsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
)

ROOT_URLCONF = 'web.urls'
WSGI_APPLICATION = 'web.wsgi.application'

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = False
USE_L10N = False
USE_TZ = True

STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
    os.path.join(BASE_DIR, 'hexclock', 'static'),
    os.path.join(BASE_DIR, 'tracking', 'static'),
    os.path.join(BASE_DIR, 'webhome', 'static'),
)
TEMPLATE_DIRS = (
    os.path.join(BASE_DIR, 'static', 'templates'),
    os.path.join(BASE_DIR, 'hexclock', 'static', 'templates'),
    os.path.join(BASE_DIR, 'tracking', 'static', 'templates'),
    os.path.join(BASE_DIR, 'webhome', 'static', 'templates'),
)
