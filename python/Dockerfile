FROM python:3.7-buster

ADD ./ /usr/src/app
RUN pip install hyperlpr==0.0.1 mysql-connector-python

EXPOSE 8080
WORKDIR /usr/src/app

CMD python server.py