# VOD application setup process
## Prerequisite
```
#Upgrade the system software for Ubuntu
sudo apt-get update
#Upgrade the software packages
sudo apt-get upgrade
#Clean all the apt-cache 
sudo apt-get clean && sudo apt-get autoclean 
```
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
* If linux do, ```sudo echo "54.89.84.225 vodapplication.com www.vodapplication.com" >> /etc/hosts```
* if windows do, add these entries in host file `54.89.84.225 vodapplication.com www.vodapplication.com` [modify-your-hosts-file](https://support.rackspace.com/how-to/modify-your-hosts-file/)
* connect to EC2 ```ssh -i "vod.pem" ubuntu@ec2-54-89-84-225.compute-1.amazonaws.com```
* configure EC2 for domain in /etc/nginx/sites-available/default
```
cd /var/www/
sudo -s
mv html html.old
git clone git@github.com:ramratangupta/vod.git html
#all done
```

