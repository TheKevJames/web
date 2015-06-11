all:
	@cat Makefile


run:
	python server.py

sass:
	sass --watch static/sass:static/css
