FROM mysocialobservations/docker-tdewolff-minify as static

COPY shared /static/img

COPY js /static/js
RUN minify --match=".*.js" --type=js --output /static/js /static/js

COPY css /static/css
RUN minify --match=".*.css" --type=css --output /static/css /static/css


FROM python:3.6.2-alpine3.6
EXPOSE 80

COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY templates /app/templates
COPY --from=static /static /app/static
COPY pages /app/pages
COPY server/* /app

CMD ["python", "/app/run.py"]
