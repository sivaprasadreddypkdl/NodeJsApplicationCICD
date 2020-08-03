#!/bin/bash
mode=$1
operation=$2
function operations_fun {
	if [[ "$operation" = "build" ]]
	then
		echo "Running Build"
		docker-compose -f $1 build
	elif [[ "$operation" = "up" ]]
	then
		echo "Running up"
		docker-compose -f $1 up -d
		docker cp ./inittables.sql mysql:/
		sleep 30
		docker exec mysql /bin/sh -c "mysql -u root -ppassword </inittables.sql"
		if [[ "$mode" = "prod" ]]
		then
		docker restart auth_container_prod
		elif [[ "$mode" = "dev" ]]
		then
		docker restart auth_container_dev
		else
		echo "Neither Prod or Dev Restarted"
		fi
                echo "waiting for services"
                sleep 30
	elif [[ "$operation" = "down" ]]
	then
		echo "Stopping Services"
		docker-compose -f $1 down
	else
		echo "Invalid Operation"
		return 0
	fi
	
}
#echo $mode
if [[ "$mode" = "dev" ]]    
then
	echo "Running for dev"
	operations_fun "docker-compose-dev.yml"
elif [[ "$mode" = "prod" ]]
then
	echo "Running for Prod"
        operations_fun "docker-compose-prod.yml"
else
	echo "Invalid input"
fi
