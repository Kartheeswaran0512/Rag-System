const pool = require('./config/db');

async function testConnection() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    console.log('✅ MySQL connected successfully:', rows);
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
  } finally {
    process.exit();
  }
}

testConnection();