const { Pool } = require('pg')

module.exports = new Pool({
  user:'john',
  password:"jj",
  host:'localhost',
  port: 5432,
  database: 'my_teacher'
})