#!/bin/bash
set -e
set -u

cd "$(dirname "$0")"

./prep_repo_for_deploy.sh

cd ./code
npm install
npm run build
sudo cp -r ./dist /apps/bos.se
cd ..

pm2 restart bos.se
