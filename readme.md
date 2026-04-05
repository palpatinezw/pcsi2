## Installation
Pre-requis - `Node.js`. Ce projet utilise `yarn` packet manager
Il faut installer séparemment les modules du site `./pcsi` et du serveur `./server`.

La commande pour lancer l'environnement de développement est `yarn run dev` dans les 2 cas. 

## Mise à jour site
1. `yarn run build`
2. `sudo rm -rf /var/www/pcsi2/*`
3. `sudo cp -r ~/pcsi2/pcsi2/dist/* /var/www/pcsi2/`

## Mise à jour serveur 
(Vérification d'état - `pm2 status` -> `pcsi2server`)
1. `yarn run build`
2. `pm2 reload pcsi2server`