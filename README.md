# Znüni-WebShop for 4eyes GmbH

This WebShop is available on: https://znueni.4eyes.ch

This is first release for production. We still improving the project.

These instructions are only for MacOSX and Linux (Debian or Ubuntu).

## Prerequisites
### for the backend
- cURL
- git
- Docker & Docker Compose

### for the frontend
- node & npm

## Fabric
- $ cd backend/fabric

if you want to change the domain name of your organisation, you can change the DOMAIN variable value in .env file.
if you want to change the logging level of the peers you can change the FABRIC_LOGGING_LEVEL variable value from INFO to DEBUG in .env file.

You can run the network in development or production context.

### download fabric binaries & docker images
- $ ./scripts/download.sh -m binaries
- $ ./scripts/download.sh -m images

### Build the fabric network (for first time setup)
- $ ./fabric-network.sh -m build 

now if you run 'docker ps' you wil see that all containers are running

### Start or stop the network (not for first time setup)
- $ cd backend/fabric
- $ ./fabric-network.sh -m start
- $ ./fabric-network.sh -m stop

### Remove the network including the data 
- $ cd backend/fabric
- $ ./fabric-network.sh -m down

### Recreate the containers without losing the data (not for first time setup)
- $  cd fabric/
- $ ./fabric-network.sh -m recreate

## Composer

### Install Composer (for first time setup)
- $ cd backend/composer
- $ ./composer-network.sh -m build      # will take a while ;) & don't panic because of the warnings :)

### Deploy the network and create the cards (Business network name is 'composer-network') (for first time setup)
- $ cd backend/composer
- $ ./composer-network.sh -m deploy     # business network name is 'composer-network' & it will take a while ;)

### Create a new admin participant (for first time setup)
- $ cd backend/composer
- $ ./composer-network.sh -m addAdminParticipant    # will have a card file in backend/composer/cards with the username you entered

### If you want to create a card for a participant which already exists
- $ cd backend/composer
- $ ./composer-network.sh -m createParticipantCard  # will have a card file in backend/composer/cards with the username you entered

### If you want to update your business network (not for first time setup)
- $ cd backend/composer
- $ ./composer-network.sh -m upgrade

### Start or stop composer-cli container (not for first time setup)
- $ cd backend/composer
- $ ./composer-network.sh -m start
- $ ./composer-network.sh -m stop

### Recreate the container without losing the data (not for first time setup)
- $ cd backend/composer
- $ ./composer-network.sh -m recreate

## Rest Server & mongo containers (Business network name is 'composer-network') (for first time setup)

Before you start the rest server, you must follow this tutorial (beginning from Step A1: Create Google API+ Project): 
https://hyperledger.github.io/composer/latest/tutorials/google_oauth2_rest

add the clientID and clientSecret values to COMPOSER_PROVIDERS & COMPOSER_PROVIDERS_DEV objects in backend/fabric/.env

### Create rest & mongo containers
- $ cd backend/rest-server
- $ ./rest-server.sh -m build   # business network name is 'composer-network' & you may enter your sudo password

### Start or stop the rest Server & mongo containers (not for first time setup) (not for first time setup)
- $ cd backend/rest-server
- $ ./rest-server.sh -m start
- $ ./rest-server.sh -m stop

### Recreate the containers without losing the data (not for first time setup)
- $ cd backend/rest-server
- $ ./rest-server.sh -m recreate

## Start the frontend
- $ npm install -g @angular/cli
- $ cd frontend/angular
- $ npm install
- $ ng serve --open

You will see a login page. when you login you will have to upload the card which generated for the admin participant you have crated using "./composer-network.sh -m addAdminParticipant".

After successful login:
- create a shopping location
- create a product
- make an order (if you have problems with order modal, just reload the page. this is a frontend issue)
- go to the shopping list or home to see your order (if you don't see it, just reload the page. this is a frontend issue)
- create a neu user
- go to backend/composer and run "./composer-network.sh -m createParticipantCard" and give the user name of new created user to generate a card for him (you can login in another browser using another google account)
- settle or reset your shopping list
- ...
