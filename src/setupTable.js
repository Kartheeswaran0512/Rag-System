const pool = require('./config/db');

async function setupTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS document_chunks (
        id VARCHAR(36) PRIMARY KEY,
        chunk_text TEXT NOT NULL,
        source_doc VARCHAR(255),
        chunk_index INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Table "document_chunks" created successfully');
  } catch (err) {
    console.error('❌ Table creation failed:', err.message);
    console.error('❌ Table creation failed:',err);
  } finally {
    process.exit();
  }
}

setupTable();