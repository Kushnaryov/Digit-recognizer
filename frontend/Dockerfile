# syntax=docker/dockerfile:1
FROM node:16.15-alpine
# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH
WORKDIR /frontend

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install
RUN npm install react-scripts 

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]