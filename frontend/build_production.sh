#!/bin/bash
set -e
set -u

cd "$(dirname "$0")"
rm -rf ./release
npm run prod
mkdir ./release
cp -r ./assets ./release/
#cp -r ./img ./release/
cp ./index.html ./release/
cp ./favicon.png ./release/
sed -i 's/bundle_dev.js/bundle_prod.js/' ./release/index.html
