---
outline: deep
---

# Deployment

## Docker automatic deployment

### Requirements

To be able to succesfully register users, you will need a working email address. You can easily use any email provider, put the necessary configuration in the [`variables.env`](https://gitlab.fel.cvut.cz/b35apo/qtrvsim-eval-web/-/blob/main/scripts/docker/variables.env?ref_type=heads).

By default, the application creates an admin account with the default credentials set to `admin` and `admin`. This can again be configured.

### Docker setup

The application can be deployed using Docker compose. The [`docker-compose.yml`](https://gitlab.fel.cvut.cz/b35apo/qtrvsim-eval-web/-/blob/main/scripts/docker/docker-compose.yml?ref_type=heads) file is located in the directory [`scripts/docker`](https://gitlab.fel.cvut.cz/b35apo/qtrvsim-eval-web/-/tree/main/scripts/docker?ref_type=heads). Configuration of the necessary variables can be done in the [`variables.env`](https://gitlab.fel.cvut.cz/b35apo/qtrvsim-eval-web/-/blob/main/scripts/docker/variables.env?ref_type=heads) files, which is read while creating the Docker containers.

You will need to have `docker` and `docker compose` installed on your machine.

You can install docker from [here](https://docs.docker.com/engine/install/), and docker-compose from [here](https://docs.docker.com/compose/install/linux/).

Then you can deploy the application by running:
```bash
cd scripts/docker
docker compose build
docker compose up
```

To delete the containers, you can run:
```bash
docker compose down
```

If you wish to delete the volumes as well, you can run:
```bash
docker volume rm <volume_name>
```

3 Docker containers are created:

- `web` - the main container with the web application (the frontend and the backend)
- `db` - the database container with the PostgreSQL database
- `evaluator` - the evaluator container what evaluates the submissions uploaded (evaluation backend)

:::info
The application is then available on `localhost:8000`, port can be changed in the [`docker-compose.yml`](https://gitlab.fel.cvut.cz/b35apo/qtrvsim-eval-web/-/blob/main/scripts/docker/docker-compose.yml?ref_type=heads) file.
:::

## Manual deployment

### Requirements

- `Python 3.11`
	- `python-dotenv`
	- `psycopg2`
	- `flask`
	- `flask-mail`
	- `toml`
	- `markdown`

- `PostgreSQL`
- `Apache2` / `Nginx` / `gnuicorn` (or any other WSGI server)

### Setup

1. Clone the repository

```bash
git clone https://gitlab.fel.cvut.cz/b35apo/qtrvsim-eval-web.git
```

2. Install the necessary packages

```bash
cd qtrvsim-eval-web
pip install -r requirements.txt
```

3. Create the database from [`scripts/create_database.sql`](https://gitlab.fel.cvut.cz/b35apo/qtrvsim-eval-web/-/blob/main/scripts/create_database.sh?ref_type=heads)

```bash
cd scripts
./create_database.sh
```

4. Set up the WSGI server

You can either use the configuration file in [`scripts/qtrvsim.conf`](https://gitlab.fel.cvut.cz/b35apo/qtrvsim-eval-web/-/blob/main/scripts/qtrvsim.conf?ref_type=heads) using a Pipfile venv, or you can use the `gunicorn` server.

5. Set up the evaluator systemd service

The evaluator is a separate service that evaluates the submissions. You can set it up as a systemd service.

```bash
cd scripts
sudo cp evaluator.service /etc/systemd/system/evaluator.service
sudo systemctl daemon-reload
sudo systemctl enable evaluator
sudo systemctl start evaluator
```