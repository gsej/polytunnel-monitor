rm -f temperature.db
sqlite3 temperature.db "create table temperature (timestamp varchar(30) not null primary key, outside decimal not null, inside decimal not null);"
