// server.js
// where your node app starts

// init project
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const env = require('dotenv').config();
const config = require('./config/database');
const mongoose = require('mongoose');

// Connect to the db
mongoose.connect(config.database);

// On connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database');
});

// On error
mongoose.connection.on('error', (err) => {
  console.log('Database error' + err);
});

const app = express();

const PORT = 3000;

// users
const users = require("./routes/users");

// Make the app public so that any domain can access
app.use(cors());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('ng_public'));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Pass in passport to config
require('./config/passport')(passport);

// Slash users will go to the users file
// Holy smokes! This took a loong time to figure out...
// app.use(bodyParser.json()); has to come BEFORE any routes for it to work
app.use('/users', users);

// http://expressjs.com/en/starter/basic-routing.html
// Index.html Route
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// Make sure any other route is sent to index.html
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'ng_public/index.html'));
});

// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
