---
outline: deep
---


# HTTPS Setup Guide using Let's Encrypt and Certbot

## Prerequisites
- A server with a domain name, with root or sudo privileges.
- Ensure your server's firewall is configured to allow HTTP (port 80) and HTTPS (port 443) traffic.

## Steps for Installation and Setup

### 1. Update Your Server's Package Manager
```bash
sudo apt update
sudo apt upgrade
```

### 2. Install Certbot
- Installation method varies depending on your server's OS and web server.
- Example for Ubuntu with Apache:
  ```bash
  sudo apt install certbot python3-certbot-apache
  ```

### 3. Choose How to Run Certbot
- Get and install your certificates:
  ```bash
  sudo certbot --apache
  ```
- Or, just get a certificate:
  ```bash
  sudo certbot certonly --apache
  ```

### 4. Set Up Automatic Renewal
- Test automatic renewal:
  ```bash
  sudo certbot renew --dry-run
  ```
- Automate the renewal process with a cron job or systemd timer.

### 5. Verify Certbot Auto-Renewal
- Check your system's crontab or systemd timers to ensure auto-renewal is set up.

### 6. Adjust Your Firewall Settings
- Update firewall settings to allow ports 80 and 443 if not already done.

### 7. Check Your Website
- Visit your website with `https://` to verify the setup.

## Additional Configurations
- Consider redirecting all HTTP traffic to HTTPS in your web server's configuration.
- Review your SSL configuration with SSL Labs' SSL Test.

## Troubleshooting
- Check web server logs for errors.
- Ensure domain name points to your server's IP.

## Final Notes
- Back up configuration files before making changes.
- Understand each step to avoid making your website inaccessible.

## Opening a Port using firewall-cmd
To open a specific port (e.g., 3333) using `firewall-cmd`, follow these steps:

```bash
sudo firewall-cmd --zone=public --permanent --add-port=3333/tcp
sudo firewall-cmd --reload
```

This will permanently add port 3333 to the list of allowed ports in the public zone and then reload the firewall settings to apply changes.