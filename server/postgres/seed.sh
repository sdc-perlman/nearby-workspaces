#!/bin/bash

###################################################
# Bash script to create database and seed
###################################################

# Path to directory bash script is living
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# if parameter 1 is not passed as argument default records to be generated to 10 million rows for 2 tables
LINES=${1:-10000000}

psql -d postgres -f createDb.sql

node pgSeeder.js --lines=$LINES

# copy to db
psql -d workspacelocations -f copyScript.sql