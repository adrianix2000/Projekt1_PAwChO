FROM scratch AS build

ADD alpine-minirootfs-3.19.1-x86_64.tar /

WORKDIR /usr/app

RUN apk add --no-cache && \
    apk add --no-cache nodejs npm

COPY ./src/package.json .
RUN npm install

FROM alpine:latest

RUN apk add --no-cache && \
    apk add --no-cache nodejs npm

WORKDIR /usr/app
COPY --from=build /usr/app/node_modules /usr/app/node_modules 
COPY ./src/server.js .

EXPOSE 4000

CMD ["node", "server.js"]