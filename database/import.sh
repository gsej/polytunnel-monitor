sqlite3 temperature.db "delete from temperature;"

sqlite3 temperature.db ".mode csv" ".import all.csv temperature"
