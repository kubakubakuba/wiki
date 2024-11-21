---
outline: deep
---

# Selfhosting a VPN with WireGuard

Link: [LinuxServer.io](https://docs.linuxserver.io/images/docker-wireguard/)

## Setup

Setup a VPS server, I used Ubuntu 22.04 Minimal.

```bash
sudo apt update 
sudo apt install docker.io
```

Create a docker container with WireGuard.

```bash
docker run -d \
  --name=wireguard \
  --cap-add=NET_ADMIN \
  --cap-add=SYS_MODULE `#optional` \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Etc/UTC \
  -e SERVERURL=wireguard.domain.com `#optional` \
  -e SERVERPORT=51820 `#optional` \
  -e PEERS=1 `#optional` \
  -e PEERDNS=auto `#optional` \
  -e INTERNAL_SUBNET=10.13.13.0 `#optional` \
  -e ALLOWEDIPS=0.0.0.0/0 `#optional` \
  -e PERSISTENTKEEPALIVE_PEERS= `#optional` \
  -e LOG_CONFS=true `#optional` \
  -p 51820:51820/udp \
  -v /path/to/wireguard/config:/config \
  -v /lib/modules:/lib/modules `#optional` \
  --sysctl="net.ipv4.conf.all.src_valid_mark=1" \
  --restart unless-stopped \
  lscr.io/linuxserver/wireguard:latest
```

Find your PUID and PGID with:

```bash
id $USER
```

Change the `/path/to/wireguard/config` to a directory on your server. For example to `/home/<user>/wireguard/config`.

## Configuration

Check if the docker container is running.

```bash
docker ps
docker ps -a
docker logs wireguard
```

To generate a new client configuration, run:

```bash
wg genkey | tee privatekey | wg pubkey > publickey
```

To generate a new preshared key, run:
```bash
wg genpsk > presharedkey
```

If the container is running, you can now configure your WireGuard client. Configuration file is in the `/path/to/wireguard/config` directory, in `wg_confs/wg0.conf`.

```bash
[Interface]
Address = 10.13.13.1
ListenPort = 51820
PrivateKey = <server_private_key>
PostUp = iptables -A FORWARD -i %i -j ACCEPT; iptables -A FORWARD -o %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth+ -j MASQUERADE
PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -D FORWARD -o %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth+ -j MASQUERADE

[Peer]
# peer 1
PublicKey = <client_public_key>
PresharedKey = <client_preshared_key>
AllowedIPs = 10.13.13.2/32

[Peer]
# peer 2
PublicKey = <client_public_key>
PresharedKey = <client_preshared_key>
AllowedIPs = 10.13.13.3/32

# Add more peers as needed
```

Client configuration file:

```bash
[Interface]
Address = 10.13.13.3
PrivateKey = <client_private_key>
ListenPort = 51820
DNS = 10.13.13.1

[Peer]
PublicKey = <server_public_key>
PresharedKey = <server_preshared_key>
Endpoint = <server_ip>:51820
AllowedIPs = 0.0.0.0/0
PersistentKeepalive = 30
```