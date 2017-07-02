#!/bin/bash
set -e
set -u

cd "$(dirname "$0")"

cd ./code
npm install
cd ..

sudo cp -r ./backend/* /apps/bos.se
cd /apps/bos.se
npm run build
pm2 restart bos.se
