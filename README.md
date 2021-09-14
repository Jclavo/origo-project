# Origo Tech Tests

This is an basic CRUD sample, using Angular + Laravel + Postgres running in a docker container.

> Features

- OAuth2 Authentication [sanctum]
- Angular Material
- API Rest

# set up project

- Clone the project
- docker-compose build
- docker-compose up

# set up Database (Postgres)

- create the folder data in "./postgres/[data]"

# set up Backend (Laravel)

[step#1]
- create .env file based on .env.example
- modify the database connection to use docker container (DB_HOST=origo-database)

[step#2]
- docker exec -it origo-backend /bin/ash (open container)
- php artisan migrate --seed (run migrations)

[step#3]
- http://localhost:8000/api (API url)

[step#4]
- go to ./src/app-backend/database/postman (postman file to test API)

# set up Frontend (Angular)

[step#1]
- http://localhost:4200 (web url)

[step#2]
- credentials
* user: admin@test.com
* password: password

