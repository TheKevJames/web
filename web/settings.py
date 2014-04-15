try:
	from web.secret import DATABASES, SECRET_KEY
except ImportError:
	SECRET_KEY = 'ThisKeyIsPubliclyViewableDoNotUseIt'

	from os.path import dirname, join

	DATABASES = {
		'default': {
			'ENGINE': 'django.db.backends.sqlite3',
			'NAME': join(dirname(__file__), 'db.sqlite3'),
		}
	}

import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

DEBUG = False
TEMPLATE_DEBUG = False

ALLOWED_HOSTS = ['0.0.0.0', '127.0.0.1', '.thekev.in', '.thekev.in.', 'thekev.in']

INSTALLED_APPS = (
	'django.contrib.staticfiles',
	'webhome',
)

MIDDLEWARE_CLASSES = (
	'django.contrib.sessions.middleware.SessionMiddleware',
	'django.middleware.common.CommonMiddleware',
	'django.middleware.csrf.CsrfViewMiddleware',
	'django.contrib.auth.middleware.AuthenticationMiddleware',
	'django.contrib.messages.middleware.MessageMiddleware',
	'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'web.urls'
WSGI_APPLICATION = 'web.wsgi.application'

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = False
USE_L10N = False
USE_TZ = False

STATIC_ROOT = '/home3/thekevi4/public_html/static/'
STATIC_URL = '/static/'
STATICFILES_DIRS = (
	os.path.join(BASE_DIR, 'static'),
	os.path.join(BASE_DIR, 'webhome', 'static'),
)
TEMPLATE_DIRS = (
	os.path.join(BASE_DIR, 'static', 'templates'),
	os.path.join(BASE_DIR, 'webhome', 'static', 'templates'),
)
