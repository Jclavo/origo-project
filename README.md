# Origo Tech Tests

# set up project

- Clone the project
- docker-compose build
- docker-compose up

# set up database

- create the folder data in "./postgres/[data]"

# set up backend

[step#1]
- create .env file based on .env.example
- modify the database connection

[step#2]
- docker exec -it origo-backend /bin/ash (open container)
- php artisan migrate --seed (run migrations)

[step#3]
- http://localhost:8000/api (API url)

[step#4]
- go to ./src/app-backend/database/postman (postman file to test API)

# set up backend

[step#1]
- http://localhost:4200 (web url)

[step#2]
- credentials
* user: admin@test.com
* password: password