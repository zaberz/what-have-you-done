FROM node

RUN mkdir /app
WORKDIR /app

COPY ./package.json /app

RUN npm install --registry=https://registry.npm.taobao.org

COPY . /app
EXPOSE 3000

CMD ["npm", "run","test:server"]
