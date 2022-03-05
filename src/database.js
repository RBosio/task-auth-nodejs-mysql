const mysql = require('mysql')
const { promisify } = require('util')
const { database } = require('./keys')


const pool = mysql.createPool(database)

pool.getConnection((err, conn) => {
  if (err) return console.error('Error')
  if (conn) {
    conn.release()
    console.log('DB is connected!')
  }
})

pool.query = promisify(pool.query)

module.exports = pool