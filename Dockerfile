#Stage 1
FROM scratch AS build

# adding alpine rootfs
ADD alpine-minirootfs-3.19.1-x86_64.tar /

# setting up the environment path
WORKDIR /usr/app

# installing nodejs and npm, removing cache
RUN apk update && \
    apk add nodejs npm && \
    rm -rf /var/cache/apk/*

# copying the package.json file and installing the dependencies
COPY ./src/package.json .
RUN npm install

# Stage 2
# using the alpine image as the base image
FROM alpine:latest

# setting the maintainer
LABEL maintainer="Adrian Sak"

# installing curl, nodejs and npm, removing cache
RUN apk update && \
    apk add curl && \
    apk add --no-cache nodejs npm && \
    rm -rf /var/cache/apk/*

# setting up the environment path, copying the node_modules and the server.js file into current container
WORKDIR /usr/app
COPY --from=build /usr/app/node_modules /usr/app/node_modules 
COPY ./src/server.js .

# exposing the port and running the server
EXPOSE 4000

CMD ["node", "server.js"]

# adding healthcheck for controlling the container status
HEALTHCHECK --interval=60s --timeout=15s \
    CMD curl -f http://localhost:4000