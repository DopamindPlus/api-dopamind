FROM node:lts-slim

RUN apt-get update -y
RUN apt-get install -y openssl

WORKDIR /app

COPY package*.json ./
COPY ./src/prisma ./src/prisma/

RUN npm install

COPY . . 

EXPOSE 3000

RUN npx prisma generate
CMD [ "npm", "run", "start" ]