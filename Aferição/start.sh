#!/bin/bash

# Start the containers
docker-compose up -d --build

# Find the container ID of the MongoDB container
mongo_container_id=$(docker ps --filter "name=mongo" --format "{{.ID}}")

# Execute import_data.sh script inside the MongoDB container
docker exec -it $mongo_container_id /bin/bash -c "cd datasets && sh import_data.sh"
