For updating frontend
yarn run build
sudo rm -rf /var/www/pcsi2/*
sudo cp -r ~/pcsi2/pcsi2/dist/* /var/www/pcsi2/

Backend w pm2
Update by yarn run build
then pm2 running the server.js build