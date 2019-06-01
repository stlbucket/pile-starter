echo dropdb phile_starter
dropdb -h 0.0.0.0 -p 5432 -U postgres phile_starter
echo createdb phile_starter
createdb -h 0.0.0.0 -p 5432 -U postgres phile_starter

cd ../ansible && ansible-playbook deploy-database.yml
