FROM node:18.17.0-alpine

WORKDIR /app

COPY package.json .
RUN npm install && npm install -g nodemon

COPY . .
RUN npx prisma generate

EXPOSE 3500/tcp
