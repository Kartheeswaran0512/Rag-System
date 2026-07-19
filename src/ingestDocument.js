const { randomUUID } = require('crypto');
const { chunkText } = require('./services/chunker');
const { embedText } = require('./services/embedder');
const pool = require('./config/db');
const qdrantClient = require('./config/qdrant');

// Full ingestion pipeline: takes a raw document and makes it "searchable"
// Flow: document -> chunks -> embeddings -> stored in Qdrant + MySQL
async function ingestDocument(text, sourceName) {
  const chunks = chunkText(text, 500, 50);
  console.log(`Split into ${chunks.length} chunks. Starting ingestion...`);

  for (let i = 0; i < chunks.length; i++) {
    // Generate ONE shared ID per chunk.
    // This ID is the "link" between Qdrant (vector) and MySQL (text) —
    // Qdrant search returns this ID, then we use it to fetch the
    // actual readable text back from MySQL.
    const chunkId = randomUUID();
    const chunkContent = chunks[i];

    // Step A: Convert this chunk's text into a vector (meaning as numbers)
    const vector = await embedText(chunkContent);

    // Step B: Store the vector in Qdrant, tagged with metadata
    // (source doc name + position), so later we know where it came from
    await qdrantClient.upsert('rag_documents', {
      points: [
        {
          id: chunkId,
          vector: vector,
          payload: { source: sourceName, chunk_index: i },
        },
      ],
    });

    // Step C: Store the actual readable text in MySQL, using the SAME id
    // Qdrant only stores numbers — MySQL is where the real text lives
    await pool.query(
      'INSERT INTO document_chunks (id, chunk_text, source_doc, chunk_index) VALUES (?, ?, ?, ?)',
      [chunkId, chunkContent, sourceName, i]
    );

    console.log(`Chunk ${i + 1}/${chunks.length} ingested`);
  }

  console.log('✅ Document ingestion complete!');
}

module.exports = { ingestDocument };
