#!/bin/bash

# block time is 52s
curl -H "Authorization: Bearer $WE_TOKEN" https://client.wavesenterprise.com/node-0/blocks/seq/$1/$2 2>/dev/null
