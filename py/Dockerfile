FROM python:3.5-alpine

EXPOSE 8080
WORKDIR /usr/src/app

CMD echo "车牌识别服务初始化！" && \
pip install --no-cache-dir -r ./requirements.txt && \
echo "车牌识别服务启动！" && \
python server.py