const { embedText } = require('./embedder');
const qdrantClient = require('../config/qdrant');
const pool = require('../config/db');

// Takes a user's question, finds the most relevant chunks, and returns
// the actual readable text (not just vectors)
async function retrieveRelevantChunks(question, topK = 3) {
  // Step 1: Convert the question into a vector, same way we embedded chunks
  const queryVector = await embedText(question);

  // Step 2: Search Qdrant for the topK most similar vectors
  // (uses cosine similarity under the hood, since that's how we
  // configured the collection)
  const searchResults = await qdrantClient.search('rag_documents', {
    vector: queryVector,
    limit: topK,
  });

  // Step 3: Qdrant only gives us IDs + similarity scores — 
  // now fetch the actual text from MySQL using those IDs
  const chunkIds = searchResults.map(result => result.id);

  if (chunkIds.length === 0) {
    return [];
  }

  const placeholders = chunkIds.map(() => '?').join(',');
  const [rows] = await pool.query(
    `SELECT id, chunk_text, source_doc, chunk_index FROM document_chunks WHERE id IN (${placeholders})`,
    chunkIds
  );

  // Step 4: Attach similarity scores back to each chunk for reference
  return rows.map(row => {
    const match = searchResults.find(r => r.id === row.id);
    return { ...row, score: match ? match.score : null };
  });
}

module.exports = { retrieveRelevantChunks };