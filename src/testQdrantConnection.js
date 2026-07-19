const client = require('./config/qdrant');
//console.log('QDRANT_URL:', process.env.QDRANT_URL);
async function testConnection() {
  try {
    const result = await client.getCollections();
    console.log('✅ Qdrant connected successfully:', result);
  } catch (err) {
    console.error('❌ Qdrant connection failed:', err);
  } finally {
    process.exit();
  }
}

testConnection();