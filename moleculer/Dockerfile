FROM node:current-alpine

RUN mkdir /app
WORKDIR /app

COPY wolfram-alpha-api-1.0.0-rc.1.tgz /app

COPY package.json ./


RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
