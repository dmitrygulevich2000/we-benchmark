#!/bin/bash

jq 'map(select(. > 0)) |
    sort |
    if length == 0 then null
    elif length % 2 == 0 then (.[length/2 - 1] + .[length/2]) / 2
    else .[(length-1) / 2] end
'
