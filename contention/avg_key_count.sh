#!/bin/bash

jq 'map(
        .transactions | 
        map(
            (.tx.contractId + "_") as $prefix | (.results | map($prefix + .key))
        ) | 
        flatten | 
        if length == 0 then 0 else 
            group_by(.) | 
            map(. | length) | 
            (add / length) 
        end
    )'

