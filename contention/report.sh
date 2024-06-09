#!/bin/bash

loc=$(dirname $0)
blocks=$($loc/blocks.sh $1 $2 2>/dev/null)

avg_key_count=$(echo $blocks | $loc/avg_key_count.sh | jq max)
norm_avg_key_count=$(echo $blocks | $loc/norm_avg_key_count.sh | $loc/positive_median.sh)

echo "average key usage (max over blocks):"
echo $avg_key_count
echo "normalized average key usage (median over blocks):"
echo $norm_avg_key_count
