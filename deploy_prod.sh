#!/bin/bash
set -e
set -u

cd "$(dirname "$0")"

./frontend/build_production.sh
sudo cp -r ./frontend/release/* /var/www/bos.se
sudo cp -r ./backend/* /srv/bos.se
cd /srv/bos.se
npm run build
pm2 restart dist
