#!/usr/bin/env bash

SERVICE=mongo-local
if docker ps -a | grep "$SERVICE" > /dev/null
then
  docker rm -f "$SERVICE"
fi
docker run -d --name "$SERVICE" -p=27017:27017  mongo
