---
outline: deep
---

# Setting Up a Systemd Service

## Overview
This guide provides the main points for setting up a systemd service with a working directory, an `ExecStart` command, and automatic restart functionality.

## Steps

### 1. Create a Systemd Service File
- Location: `/etc/systemd/system/<service_name>.service`
- Example: `/etc/systemd/system/myapp.service`

### 2. Define Service Configuration
In the service file, include the following sections:

#### [Unit]
- Description: Brief description of the service.
- After: Specify the order of service startup. Commonly `network.target` for network-dependent services.

#### [Service]
- `WorkingDirectory`: The directory from which the service should be executed.
- `ExecStart`: The command to start the service, usually the path to the executable.
- `User`: (Optional) The user under which the service will run.
- `Restart`: Define restart behavior, typically `on-failure`.
- `RestartSec`: (Optional) Time to wait before restarting the service after a failure.

#### [Install]
- `WantedBy`: Define the target that the service should be attached to, usually `multi-user.target`.

### 3. Enable and Start the Service
- Reload systemd: `sudo systemctl daemon-reload`
- Enable the service: `sudo systemctl enable <service_name>.service`
- Start the service: `sudo systemctl start <service_name>.service`

### 4. Monitoring and Maintenance
- Check status: `sudo systemctl status <service_name>.service`
- Restart service: `sudo systemctl restart <service_name>.service`
- View logs: `journalctl -u <service_name>.service`

## Example

Here's an example of a systemd service file for a Node.js application:

```ini
[Unit]
Description=Node.js Example App
After=network.target

[Service]
WorkingDirectory=/path/to/nodejs/app
ExecStart=/usr/bin/node /path/to/nodejs/app/app.js
User=nodeuser
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

- `WorkingDirectory`: This is the directory where your Node.js app resides, e.g., `/path/to/nodejs/app`.
- `ExecStart`: This is the command to start your Node.js app, e.g., `node app.js`.
- Replace `/path/to/nodejs/app` and `nodeuser` with the actual path to your application and the username under which it should run.