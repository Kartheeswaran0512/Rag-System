const client = require('./config/qdrant');

async function setupCollection() {
  try {
    await client.createCollection('rag_documents', {   // collection name - rag_documents
      vectors: {
        size: 1536, //size dimension
        distance: 'Cosine',   // similatiy 
      },
    });
    console.log('✅ Collection "rag_documents" created successfully');
  } catch (err) {
    console.error('❌ Failed to create collection:', err.message);
  } finally {
    process.exit();
  }
}

setupCollection();