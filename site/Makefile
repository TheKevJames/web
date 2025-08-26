.PHONY: all build install local view

BUILDDIR = build
STATICDIR = static

STATICSOURCES = $(wildcard $(STATICDIR)/*.txt)
STATICBUILDS = $(patsubst $(STATICDIR)/%.txt, $(BUILDDIR)/%.txt, $(STATICSOURCES))

OBJECTS = $(STATICBUILDS) build/blog build/favicon.png build/.well-known/security.txt build/img/travel.svg build/codehilite.css build/codehilite.light.css

all: $(OBJECTS)

$(BUILDDIR)/%.txt: $(STATICDIR)/%.txt build
	cp $< $@

build:
	mkdir -p $@
build/blog: build install
	mkdir -p $@
	poetry run render  # TODO: better place

build/favicon.png: ../shared/favicon.png build
	cp $< $@

build/.well-known: build
	mkdir -p $@
build/.well-known/security.txt: build/security.txt build/.well-known
	cp $< $@

build/img: build
	mkdir -p $@
build/img/travel.svg: install build/img
	poetry run draw

build/codehilite.css: build install
	poetry run pygmentize -S gruvbox-dark -f html -a .codehilite > $@
build/codehilite.light.css: build install
	poetry run pygmentize -S gruvbox-light -f html -a .codehilite > $@


install:
	poetry sync

# requires secrets, must be run locally
local: src/data.cache static/security.txt

src/data.cache: install
	poetry run cache ~/sync/finance/location.beancount

static/security.txt: security.txt
	gpg --clearsign --default-key KevinJames@thekev.in -o $@ $<


view: all
	python3 -m http.server -d build/
