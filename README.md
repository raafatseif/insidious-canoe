# Insidious Canoe Dashboard

What makes it special? No one cares... yet

ヽ(๏∀๏ )ﾉ

## ← index.html

Where you'll write the content of your website. 

## ← styles.css

CSS files add styling rules to your content

## ← script.js

If you're feeling fancy you can add interactivity to your site with Javascript

## Running the containers
## Using Compose
docker-compose up

## Individual containers
### express-node
docker build -t express-node:dev .

docker run -d --name express-node -p 3000:3000 express-node:dev

docker stop express-node

docker start express-node

### angular-client
docker run -d --name angular-client -p 4200:4200 angular-client:dev

### mongodb
docker run -d --name mongodb -p 27017:27017 mongo