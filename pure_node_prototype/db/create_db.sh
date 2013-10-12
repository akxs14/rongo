# psql --username=postgres -W -h localhost -f create_rongo_db.sql
psql --username=postgres -W -h localhost --dbname=rongo -f create_rongo_schema.sql
