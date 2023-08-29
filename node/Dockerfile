FROM node:18.17.1-alpine

RUN apk update && \
    apk add wget netcat-openbsd && \
    wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
    chmod +x /usr/bin/wait-for && \
    rm -rf /var/cache/apk/*

WORKDIR /usr/src/app

COPY . .

RUN chmod +x /usr/src/app/custom-entrypoint.sh

RUN cd src && npm install

EXPOSE 3000
