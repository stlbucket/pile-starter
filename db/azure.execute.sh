#!/usr/bin/env bash
echo -d phile_starter -h ps-demo-db-dev.postgres.database.azure.com
echo script: $1

psql "sslmode=verify-ca sslrootcert=../../root.crt host=ps-demo-db-dev.postgres.database.azure.com port=5432 dbname=ps-demo-db-dev user=psdemoadmin@ps-demo-db-dev password=LL38f7ooLL38f7oo sslmode=require" -a --file $1