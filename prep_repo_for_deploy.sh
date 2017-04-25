#!/bin/bash
set -e
set -u

git checkout .
git fetch
git rebase
chmod 777 *

