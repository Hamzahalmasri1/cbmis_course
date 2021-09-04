var mysql = require('mysql')
module.exports = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port:'3308',
  password: 'Authentication',
  database: 'cbmisdb'
})