# Berkedia Node js challenge

This project is a challenge from Berkedia which requires to create a node js application CRUD
and deploy it on minikube kubernetes cluster.

## Usage

# DOCKER
Steps to run under docker and docker-compose
    1) Run `make up`
    2) Run `make migrate`

# Kubernetes + Minikube deployment
Steps to deploy on kubernetes with minikube
    After minikube start is successfully ran, Please follow the below steps:
    1) Run `make kube-deploy`
    2) Run `make kube-migrate`
    3) Run `minikube service nginx`
    Copy URL from result of previous command
    Note: one url is for http and one for https. pick http url for now

## Requirements

- GNU Make (available in your package manager of preference)

If you wish to play with it without locally installing Postgres and
Node you can take advantage of `docker` and `docker-compose` which
would help you build the container images and setup a working
environment for you:

- Docker: https://docs.docker.com/engine/installation/
- Docker Compose: https://docs.docker.com/compose/install/

If you want to try this out within a Kubernetes environment this is
all you need:

- Kubectl: https://kubernetes.io/docs/tasks/tools/install-kubectl/
- Minikube: https://kubernetes.io/docs/tasks/tools/install-minikube/

## Usage with Docker

Once `docker` and `docker-compose` are installed run `make up`.

This will trigger the pulling and building of the necessary images and
will use `docker-compose` to setup the app and the Postgres
containers.

Once the Postgres container starts up (note that it may take a few
minutes until it starts accepting connections the first time) you can
run the database migrations with the `make migrate` command.

After everything is up and running you can start hitting the API
server via port `3000` like so:

    curl -X POST http://localhost:3000/books \
        -H 'Content-Type: application/json' \
        -d '{"title": "Martín Fierro", "author": "José Hernandez"}'

The Postgres database data directory is setup to be mounted in the
`pgdata` directory at the root of the project. In case you want to
start afresh just issue `make clean-db`.

## Usage with Minikube + Kubernetes

Once `minikube` is running (via `minikube start`), you can trigger a
deployment with `make kube-deploy`. This command will take care of
building the images inside the Minikube internal docker registry and
make it available for deploy. It would also apply all YAML files
inside of the `deploy/` directory.

Similarly to the Docker workflow, once the Postgres service is up, you
should run database migrations with `make kube-migrate`.

Once everything is up, you can hit the API like so:

    curl -X POST $(minikube service nginx --url | head -n 1)/books \
        -H 'Content-Type: application/json' \
        -d '{"title": "Martín Fierro", "author": "José Hernandez"}'

The Nginx service has two ports open, the first for `http` and the
second for `https` traffic. Should you want to try SSL, use:

    curl -k -X POST $(minikube service nginx --url | tail -n 1 | sed 's/http:/https:/')/books \
        -H 'Content-Type: application/json' \
        -d '{"title": "Berkedia challenge", "author": "Sameer Verma"}'

Note the current deploy does not mount the database volume in any
persistent place.

## WINDOWS setup 

If you are on Windows platform, first download chocolatey: https://chocolatey.org/install
and then Run the following command:
`choco install make` from CMD or powershell window.
follow the steps mentioned above to run the application