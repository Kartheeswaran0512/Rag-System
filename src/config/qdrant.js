const { QdrantClient } = require('@qdrant/js-client-rest');
require('dotenv').config();

// Connects to our Qdrant Cloud vector database
const client = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
  checkCompatibility: false, // skips version-check that caused earlier errors
});

module.exports = client;
