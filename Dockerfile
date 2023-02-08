### STAGE 1: Build ###
FROM node:19-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM httpd:2.4.55-alpine
COPY ./dist/painelWeb-ui/ /usr/local/apache2/htdocs/
