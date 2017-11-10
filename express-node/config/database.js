// Standard URI format: mongodb://[dbuser:dbpassword@]host:port/dbname, details set in .env
//var MONGODB_URI = 'mongodb://'+process.env.DB_USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DB_PORT+'/'+process.env.DB;
var MONGODB_URI = 'mongodb://'+process.env.HOST+'/'+process.env.DB;

module.exports = {
  database: MONGODB_URI,
  secret: process.env.SECRET
}
