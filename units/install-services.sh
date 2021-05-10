cp record-temperatures.service /etc/systemd/system
systemctl enable record-temperatures.service
systemctl start record-temperatures.service

cp take-pictures.service /etc/systemd/system
cp take-pictures.timer /etc/systemd/system
systemctl enable take-pictures.timer
systemctl start take-pictures.timer

cp gunicorn.service /etc/systemd/system
systemctl enable gunicorn.service
systemctl start gunicorn.service
