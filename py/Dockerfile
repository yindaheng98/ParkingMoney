FROM python

RUN mkdir ~/.pip
ADD pip.conf ~/.pip/pip.conf
RUN pip install hyperlpr mysql-connector-python -i https://pypi.tuna.tsinghua.edu.cn/simple

EXPOSE 8080
WORKDIR /usr/src/app

CMD python server.py