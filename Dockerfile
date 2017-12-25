# Create image based on the official Node 8 image from dockerhub
FROM node:8
ENV NPM_CONFIG_LOGLEVEL info

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
#COPY package.json /usr/src/app

# Get all the code needed to run the app
# TODO make sure it does not copy node_modules
COPY . /usr/src/app

# Install dependecies
RUN cd express-node && npm install
RUN cd angular-src && npm install

# Bug: install before angular cli
#RUN npm install --unsafe-perm --verbose -g sails

# Install angular cli
#RUN npm install -g @angular/cli
RUN npm install -g @angular/cli --unsafe

# Get all the code needed to run the app
#COPY . /usr/src/app

# TODO prep the angular, without serving?
# TODO  
# BUG: Property 'authService' is private and only accessible within class 'NavbarComponent'. FIX  add aot to build command
# BUG: `ng build` fails with error `Cannot find module 'webpack/lib/node/NodeTemplatePlugin'` FIX remove package-lock.json
RUN cd angular-src && ng build --prod --aot=false

# TODO move angular to public
# Maybe no need since it is done in output directory in angular-cli.json

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
#RUN cd express-node && npm start
# Using RUN runs npm start in docker build, while CMD runs at docker run
WORKDIR express-node
CMD ["npm", "start"]