// Standard URI format: mongodb://[dbuser:dbpassword@]host:port/dbname, details set in .env
//var MONGODB_URI = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DB_PORT+'/'+process.env.DB;
// const USER='node'
// const PASS='mjinga'
// const HOST='ds147454.mlab.com'
// const DB_PORT='47454'
// const DB='insidious-canoe'

const USER=''
const PASS=''
const HOST='localhost'
const DB_PORT='27017'
const DB='mean-docker'

module.exports = {
  database: 'mongodb://'+USER+':'+PASS+'@'+HOST+':'+DB_PORT+'/'+DB,
  secret: 'yoursecret'
}
