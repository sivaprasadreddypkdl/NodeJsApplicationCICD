FROM node:latest

RUN mkdir /usr/siva/
# Create app directory
WORKDIR /usr/siva

# Copy source code to docker image
COPY . /usr/siva/

#npm dependency install
#RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]