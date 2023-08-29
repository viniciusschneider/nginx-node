#!/bin/sh
set -e

cd ./src
npm install
exec docker-entrypoint.sh index.js
