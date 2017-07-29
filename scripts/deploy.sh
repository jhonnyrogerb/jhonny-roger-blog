#!/bin/sh
# deploy.sh
set -e

sudo apt-get install -y rsync

rsync -e "ssh -o StrictHostKeyChecking=no" -e "ssh -i /tmp/id_rsa" -ravzup public/* jhonnyroger@jhonnyroger.com:~/public_html/