#!/bin/bash
set -e
set -u

cd "$(dirname "$0")"

cd ./frontend
npm install
cd ..


cd ./backend
npm install
cd ..

./deploy_prod.sh
