const mysql = require('mysql2/promise');
require('dotenv').config();

// Creates a "pool" of reusable MySQL connections instead of opening
// a fresh connection every time — much faster for repeated queries
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  ssl: { rejectUnauthorized: false }, // Aiven requires an encrypted (SSL) connection
  waitForConnections: true,
  connectionLimit: 10, // max 10 simultaneous connections, prevents overload
});

module.exports = pool;
//createpool - multiple connection open and reuse them
