FROM node:8-alpine

EXPOSE 3000
COPY ./ /home/node/app
WORKDIR /home/node/app

CMD echo "node启动！" && \
    npm install && \
    npm start