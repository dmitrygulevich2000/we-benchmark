#!/bin/bash

jq 'map(select(. > 0)) | (add / length)'
