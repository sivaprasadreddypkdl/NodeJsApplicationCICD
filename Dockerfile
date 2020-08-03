FROM mysql:latest

RUN mkdir /usr/siva/
# Create app directory
WORKDIR /usr/siva

# Copy source code to docker image
COPY inittables.sql /usr/siva/

RUN cp /usr/siva/inittables.sql /docker-entrypoint-initdb.d

EXPOSE 3306