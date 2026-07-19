//const { v4: uuidv4 } = require('uuid');
const { randomUUID } = require('crypto');
const { chunkText } = require('./services/chunker');
const { embedText } = require('./services/embedder');
const pool = require('./config/db');
const qdrantClient = require('./config/qdrant');

async function ingestDocument(text, sourceName) {
  const chunks = chunkText(text, 500, 50);
  console.log(`Split into ${chunks.length} chunks. Starting ingestion...`);

  for (let i = 0; i < chunks.length; i++) {
    const chunkId = randomUUID();
    const chunkContent = chunks[i];

    // Step A: Generate embedding
    const vector = await embedText(chunkContent);

    // Step B: Store vector in Qdrant
    await qdrantClient.upsert('rag_documents', {
      points: [
        {
          id: chunkId,
          vector: vector,
          payload: { source: sourceName, chunk_index: i },
        },
      ],
    });

    // Step C: Store text + metadata in MySQL
    await pool.query(
      'INSERT INTO document_chunks (id, chunk_text, source_doc, chunk_index) VALUES (?, ?, ?, ?)',
      [chunkId, chunkContent, sourceName, i]
    );

    console.log(`Chunk ${i + 1}/${chunks.length} ingested`);
  }

  console.log('✅ Document ingestion complete!');
}

module.exports = { ingestDocument };