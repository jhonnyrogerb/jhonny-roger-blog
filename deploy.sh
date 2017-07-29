#!/bin/sh
# deploy.sh
set -e

sudo apt-get install -y rsync

rsync -ravzup public/* jhonnyroger@jhonnyroger.com:~/public_html/