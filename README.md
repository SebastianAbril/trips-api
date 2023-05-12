
# How to Run?

## Instructions to run the project locally (Dev environment):
1. Start the database by running the following Docker command:
```
docker run --name trips-database -p 5432:5432 -e POSTGRES_DB=trips_db -e POSTGRES_USER=trips_user -e POSTGRES_PASSWORD=123456 -d postgres:11
```
2. Copy the .env.example file and rename it to .env.
3. Fill in the necessary information in the .env file:
```
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_USERNAME=trips_user
DATABASE_PASSWORD=123456
DATABASE_NAME=trips_db
```
4. Install the project dependencies by running:
```
npm install
```
5. To execute the migrations, run the following command:
```
npm run migration:run
```
6. To run the project, use the following command:
```
npm run start:dev
```
7. You can access the API documentation in your browser at the following URL:
```
http://localhost:3000/api
```

## Instructions to run the project with Docker:
1. Create a network
```
docker network create trip-net
```

2. Start the database by running the following Docker command:
```
docker run --net trip-net --name trips-database -p 5432:5432 -e POSTGRES_DB=trips_db -e POSTGRES_USER=trips_user -e POSTGRES_PASSWORD=123456 -d postgres:11
````
2. Run the container for the application using the following command:
```
docker run -d --pull --name trips-api --net trip-net -p 3000:3000 -e DATABASE_HOST=trips-database -e DATABASE_PORT=5432 -e DATABASE_USERNAME=trips_user -e DATABASE_PASSWORD=123456 -e DATABASE_NAME=trips_db sebastianabril6/trips-api:latest
```
3. It's important to note that both containers are being created in the same network so that they can communicate with each other.
```
4. You can access the API documentation in your browser at the following URL:
```
http://localhost:3000/api



docker build -t sebastianabril6/trips-api:latest .
docker login
docker push sebastianabril6/trips-api:latest

AWS_EC2_HOST
AWS_EC2_KEY
AWS_EC2_USERNAME
DOCKERHUB_TOKEN
DOCKERHUB_USERNAME


docker run --restart always --net trip-net --name trips-database -p 5432:5432 -e POSTGRES_DB=trips_db -e POSTGRES_USER=trips_user -e POSTGRES_PASSWORD=123456 -d postgres:11


docker run -d --pull always --restart always --name trips-api --net trip-net -p 3000:3000 -e DATABASE_HOST=trips-database -e DATABASE_PORT=5432 -e DATABASE_USERNAME=trips_user -e DATABASE_PASSWORD=123456 -e DATABASE_NAME=trips_db sebastianabril6/trips-api:latest