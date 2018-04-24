#!/usr/bin/env bash
source ./cmd.config
echo -d $database -h $hostname
echo script: $1
psql -U postgres -f dev/$1.sql -d $database -h $hostname
