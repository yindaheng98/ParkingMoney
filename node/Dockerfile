FROM node:8-alpine

EXPOSE 3000
WORKDIR /home/node/app

CMD echo "node启动！" && \
npm install -g cnpm --registry=https://registry.npm.taobao.org && \
cnpm install && \
npm start