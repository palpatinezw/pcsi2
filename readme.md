For updating frontend
yarn run build
sudo cp -r ~/pcsi2/pcsi2/dist/* /var/www/pcsi2/
sudo systemctl reload nginx

Backend w pm2
Update by yarn run build
then pm2 running the server.js build