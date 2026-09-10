.PHONY: all build install local view

BUILDDIR = build
STATICDIR = static

STATICSOURCES = $(wildcard $(STATICDIR)/*.txt)
STATICBUILDS = $(patsubst $(STATICDIR)/%.txt, $(BUILDDIR)/%.txt, $(STATICSOURCES))

OBJECTS = $(STATICBUILDS) build/blog build/favicon.png build/.well-known/security.txt build/embed/travel.html build/codehilite.css build/codehilite.light.css

all: $(OBJECTS)

$(BUILDDIR)/%.txt: $(STATICDIR)/%.txt build
	cp $< $@

build:
	mkdir -p $@
build/blog: build install
	mkdir -p $@
	uv run render

build/favicon.png: ../shared/favicon.png build
	cp $< $@

build/.well-known: build
	mkdir -p $@
build/.well-known/security.txt: build/security.txt build/.well-known
	cp $< $@

build/embed: build
	mkdir -p $@
build/embed/travel.html: install build/embed
	uv run draw

build/codehilite.css: build install
	uv run pygmentize -S gruvbox-dark -f html -a .codehilite > $@
build/codehilite.light.css: build install
	uv run pygmentize -S gruvbox-light -f html -a .codehilite > $@


install:
	uv sync

# requires secrets, must be run locally
local: website/data.cache static/security.txt

website/data.cache: install
	uv run cache ~/sync/finance/location.beancount

static/security.txt: security.txt
	gpg --clearsign --default-key KevinJames@thekev.in -o $@ $<


view: all
	python3 -m http.server -d build/
