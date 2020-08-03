# REACT_NODE_MICROSERVICES_DOCKER

https://github.com/DIYDevOps/Sample_react_microservice

Clone the above repo

Prerequisites:

1. Node 10.21.0
2. Docker

Install and Run locally:

docker run -d --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password mysql:5.7

Connect to mysql and run inittables.sql to load data

run **npm install** in both frontend/web and authservice/auth-app directories

run **npm start** in frontend/web directory in one terminal

run **npm start** in authservice/auth-app in another terminal

Part 1:

You have three components 
    
    1. Node Web app
    2. Node Auth api app (backend api)
    3. Nginx proxy (optional of Part 2)

Create Dockerfiles for Web app and Auth app -- containerize these node js apps

    1. Run Docker mysql locally, connect auth app to mysql
    2. Each of the above components should have two dockerfiles 
       - one for dev and one for production purpose at authservice, frontend, Nginx root directories each 
       - follow the best practices for creating these dockerfiles
    3. create two docker-compose files at the root directory 
       - one for dev and production 
       - both files should build docker images using the dockerfiles (dev and prod) and run services when invoked accordingly.
        1. dev docker compose should expose both web app 
           - auth api app in localhost 8080 and 8081 respectively 
           - connect auth api to mysql internally.
        2. production docker-compose should expose only web app 
           - auth api should connect to web app using docker network
           - connect auth api to mysql internally
           - auth api should not be accessible in localhost.
    4. Both in dev and prod docker compose 
       - after starting mysql through the docker compose, initialize mysql database using inittables.sql
    5. write a script ( choose any scripting language of your choice) that builds the dockerfiles for both dev and production images.
    6. Host your local jenkins server or use CircleCI Cloud with your github account. 
       run the script created at step 5 in Jenkins or CircleCI.  

**Make changes to source code as needed to change port numbers of the applications and connectivity to database.
Add files as need for completing the above Part 1 and push to your own Public Github repo. Attach(commit) reports or output of jenkins/circleCI in your repo.
We are looking for best pratices in source control management and docker, dockerfiles.**

Part 2 (Optional but expected when discussed for further rounds):

Use Nginx as reverse proxy for both web app and auth api service.
Commit your Nginx conf file with the needed configuration when running in a docker container.
Only Nginx should be exposed when ran through docker-compose and others -- mysql, auth api app, web app should be accessible through Nginx endpoint.

Optionally, if you are using Jenkins for Part 1, run all the components in a jenkins job using the docker-compose production file you have created.

