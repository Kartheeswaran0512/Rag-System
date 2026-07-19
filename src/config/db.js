const mysql = require('mysql2/promise');
require('dotenv').config();
console.log('HOST:', process.env.MYSQL_HOST);
console.log('PORT:', process.env.MYSQL_PORT);
console.log('USER:', process.env.MYSQL_USER);
console.log('DB:', process.env.MYSQL_DATABASE);

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  ssl: { rejectUnauthorized: false },  // Aiven requires SSL
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
//createpool - multiple connection open and reuse them