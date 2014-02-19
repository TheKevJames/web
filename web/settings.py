import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

SECRET_KEY = 'cr33hjtn4m^1#4^=r$gc*=l&f7l4_&umm_mjoop87!p4-3$n^)'

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

DATABASES = {
	'default': {
		'ENGINE': 'django.db.backends.sqlite3',
		'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
	}
}

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
