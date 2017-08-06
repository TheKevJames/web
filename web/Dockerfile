FROM python:3.6.2-alpine3.6

EXPOSE 80

COPY requirements.txt /src/requirements.txt
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r /src/requirements.txt

COPY . /src

CMD ["python", "/src/server.py"]
