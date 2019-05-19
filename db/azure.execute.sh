# echo dropdb phile
# dropdb --echo --sslmode verify-ca --sslrootcert ../../root.crt --host phile.postgres.database.azure.com --user postgres@phile --dbname=phile
# # dropdb "echo sslmode=verify-ca sslrootcert=../../root.crt host=phile.postgres.database.azure.com user=postgres@phile dbname=phile"
# # dropdb -h phile.postgres.database.azure.com -p 5432 -U postgres phile
# echo createdb phile
# # createdb -h phile.postgres.database.azure.com -p 5432 -U postgres phile


# 	# host=phile.postgres.database.azure.com port=5432 dbname={your_database} user=postgres@phile password={your_password} sslmode=required



#!/usr/bin/env bash
echo -d phile_starter -h ps-demo-db-dev.postgres.database.azure.com
echo script: $1
# psql -U psdemoadmin@ps-demo-db-dev -f $1 -d phile -h ps-demo-db-dev.postgres.database.azure.com --sslmode verify-ca --sslrootcert ../../root.crt 
# psql -U psdemoadmin@ps-demo-db-dev -d phile_stater -h ps-demo-db-dev.postgres.database.azure.com --sslmode verify-ca --sslrootcert ../../root.crt 

psql "sslmode=verify-ca sslrootcert=../../root.crt host=ps-demo-db-dev.postgres.database.azure.com port=5432 dbname=ps-demo-db-dev user=psdemoadmin@ps-demo-db-dev password=LL38f7ooLL38f7oo sslmode=require
" -a --file $1