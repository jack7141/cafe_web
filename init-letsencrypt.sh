#!/bin/bash

DOMAIN=221.155.148.197
EMAIL=ghl92479@gmail.com

docker-compose run --rm --entrypoint "\
  certbot certonly --webroot \
  --email $EMAIL \
  --agree-tos \
  --webroot-path=/var/www/certbot \
  -d $DOMAIN \
  -d www.$DOMAIN" certbot

docker-compose up -d
