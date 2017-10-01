// This is going to be all of our users routes
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const config = require("../config/database");
const User = require('../models/user');

//Register
router.post('/register', function (request, response, next) {
  // console.log("Request body"+request.body.name);
  // console.log(request.headers);
  
  let newUser = new User({
    name: request.body.name,
    email: request.body.email,
    username: request.body.username,
    password: request.body.password
  });
  
  User.addUser(newUser, (err, user) => {
    if(err){
      response.json({success: false, msg: 'Failed to register user'});
      console.log("add user error:" + err);
    }
    else {
      response.json({success: true, msg: 'User registered'});
    }
  })
});

// Authenticate
router.post('/authenticate', (request, response, next) => {
  const username = request.body.username;
  const password = request.body.password;
  
  User.getUserByUsername(username, function(error, user) {
    if(error) throw error;
    
    if(!user) {
      return response.json({success: false, msg: 'User not found'});
    }
    
    User.comparePassword(password, user.password, function(error, isMatch) {
      if(error) throw error;
      
      if(isMatch) {
        // Create and get token
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800  // One week, then the user logs in again
        });
        
        // Response to the frontend and send token and user data back
        response.json({
          success: true, 
          token: 'JWT ' + token,  // WTH the space (after JWT) is actually important, spent too long to figure that out
          user: {
            id: user._id,
            name: user.name, 
            username: user.username, 
            email: user.email
          }
        });        
      }
      else {
        return response.json({success: false, msg: "Wrong password"});
      }
    });
  });
});

// Profile add authentication for protecting this route
router.get('/profile', passport.authenticate('jwt', {session: false}), function(request, response, next) {
  // console.log('hiii');  //DEBUG
  // console.log("Request body"+request.body.name);
  // console.log(request.headers);
  response.json({user: request.user});
});

module.exports = router;