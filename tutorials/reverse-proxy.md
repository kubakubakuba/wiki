---
outline: deep
---

# Setting Up an Apache Reverse Proxy for a Flask Application

## 1. Install Apache
First, update your package list and install Apache:
```bash
sudo apt update
sudo apt install apache2
```

## 2. Enable Required Apache Modules
You'll need to enable a few modules in Apache for the reverse proxy to work:
```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod proxy_balancer
sudo a2enmod lbmethod_byrequests
```
After enabling these modules, restart Apache to apply the changes:
```bash
sudo systemctl restart apache2
```

## 3. Configure Apache as a Reverse Proxy
Now, you need to configure Apache to forward requests to your Flask application. This is done by editing the Apache configuration files.

Create a new configuration file in `/etc/apache2/sites-available/`:
```bash
sudo nano /etc/apache2/sites-available/myapp.conf
```
In this file, add the following configuration (adjust the `ProxyPass` and `ProxyPassReverse` directives to point to the port where your Flask app is running):
```apache
<VirtualHost *:80>
    ServerName mydomain.com
    ServerAdmin webmaster@localhost

    ProxyRequests Off
    <Proxy *>
        Order deny,allow
        Allow from all
    </Proxy>

    ProxyPass / http://127.0.0.1:5000/
    ProxyPassReverse / http://127.0.0.1:5000/

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```
Replace `mydomain.com` with your actual domain. Also, change `http://127.0.0.1:5000/` to the address where your Flask app is running (if it's different).

## 4. Enable the New Site
After creating the configuration file, enable the new site and disable the default site (if not needed):
```bash
sudo a2ensite myapp.conf
sudo a2dissite 000-default.conf
```

## 5. Restart Apache
Finally, restart Apache to apply your changes:
```bash
sudo systemctl restart apache2
```

## 6. Test the Configuration
Now, try accessing your domain (`mydomain.com` in the example). Apache should forward the requests to your Flask application.

## Additional Notes
- If you don't have a domain, and you're just testing locally, you can modify your `/etc/hosts` file to simulate a domain pointing to your local machine.
- Make sure your Flask app is running and accessible on the port you specified in the Apache configuration.
- If you're setting this up in a production environment, consider securing your server with HTTPS using Let's Encrypt and Certbot.

This guide will help you set up your Apache reverse proxy to forward requests to your Flask application.