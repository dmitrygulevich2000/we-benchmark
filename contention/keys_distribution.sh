#!/bin/bash

jq 'map(
    .transactions | 
        map(
            (.tx.contractId + "_") as $prefix | 
            (.results | map($prefix + .key))
        ) | 
        flatten | 
        if length == 0 then {} else 
            group_by(.) | 
            map(.[0] as $key | {($key): length}) |
            add
        end
    )'
