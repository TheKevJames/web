FROM python:3.6.2-alpine3.6
EXPOSE 80

COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY templates /app/templates
COPY /static /app/static
COPY pages /app/pages
COPY server/* /app

CMD ["python", "/app/run.py"]
