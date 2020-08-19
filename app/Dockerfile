FROM node:8-alpine

EXPOSE 3000
COPY ./ /home/node/app
WORKDIR /home/node/app
RUN npm install

CMD echo "node启动！" && npm start