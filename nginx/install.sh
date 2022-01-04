rm /etc/nginx/sites-available/*
rm /etc/nginx/sites-enabled/*

cp sites/* /etc/nginx/sites-available

# install the original all python site - python api and python templated site.
ln -s  /etc/nginx/sites-available/polytunnel-api /etc/nginx/sites-enabled
ln -s  /etc/nginx/sites-available/polytunnel-webui /etc/nginx/sites-enabled

systemctl restart nginx
