#!/usr/bin/env bash
echo -d phile_starter -h ps-demo-db-dev.postgres.database.azure.com
psql "sslmode=verify-ca sslrootcert=../../root.crt host=ps-demo-db-dev.postgres.database.azure.com port=5432 dbname=phile_starter user=psdemoadmin@ps-demo-db-dev password=LL38f7ooLL38f7oo sslmode=require"