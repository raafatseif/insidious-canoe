// Bring in Strategy
const JwtStrategy = require('passport-jwt').Strategy;
// Bring in utility
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database')

module.exports = function(passport){  
  // Create options
  let opts = {};
  
  // Fetch the token
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = config.secret;
  
  // Callback to get payload which includes user info
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload); // DEBUG
    User.getUserById(jwt_payload.data._id, function(error, user) {
      if(error) {
        return done(error, false);
      }
      
      if(user){
        return done(null, user);        
      }
      
      else {
        return done(null, false);
      }
    });
  }));
}