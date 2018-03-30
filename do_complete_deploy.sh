#!/bin/bash
set -e
set -u

cd "$(dirname "$0")"

./prep_repo_for_deploy.sh

cd ./code
npm install
npm run build
sudo cp -r ./dist /apps/bos.se
sudo cp -r ./node_modules /apps/bos.se
cd ..
sudo cp -r ./config/pm2.json /apps/bos.se

pm2 restart bos.se
