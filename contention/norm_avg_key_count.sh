#!/bin/bash

jq 'map(
        .transactionCount as $size | 
        .transactions | 
        map(
            (.tx.contractId + "_") as $prefix | 
            (.results | map($prefix + .key))
        ) | 
        flatten | 
        if length == 0 then 0 else 
            group_by(.) | 
            map(. | length) | 
            ((add / length) / $size) 
        end
    )'

