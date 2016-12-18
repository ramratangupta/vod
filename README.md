# VOD application setup process
## Prerequisite
* Install git if not installed. 
```shellscript
apt-get install git-all
```
* A server configured with LAMP / LEMP, I configured with LEMP, 
How To Install Linux, nginx, MySQL, PHP ](https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-on-ubuntu-12-04)
* Install curl for your PHP NGINX environment
```shellscript
    sudo apt-get install curl    
    sudo apt-get install php5-curl    
    sudo service php5-fpm restart
```
* Install Couch DB if not installed
```
sudo apt-get install python-software-properties -yf
sudo apt-get update -y
sudo apt-get remove couchdb couchdb-bin couchdb-common -yf
sudo apt-get install -V couchdb
```
## Setup process
