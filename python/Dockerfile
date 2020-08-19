FROM python:3.8-buster

ADD ./ /usr/src/app
RUN pip install hyperlpr==0.0.1 opencv-python==4.3.0.36 mysql-connector-python

EXPOSE 8080
WORKDIR /usr/src/app

CMD python server.py