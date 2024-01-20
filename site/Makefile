.PHONY: all
all: static/security.txt
	poetry install --sync
	poetry run freeze ~/sync/finance/location.beancount

static/security.txt: security.txt
	gpg --clearsign --default-key KevinJames@thekev.in -o $@ $<
