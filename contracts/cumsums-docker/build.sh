#!/bin/bash

if [[ -z $1 ]]; then
    echo "1st arg - image name (with registry provided)" 
    exit 1
fi

echo "BUILDING IMAGE..." &&\
docker build -t $1 . &&\
echo "GOT IMAGE WITH HASH:" &&\
docker inspect $1 | jq '.[0].Id' | sed -E 's/"sha256:(.*)"/\1/'
