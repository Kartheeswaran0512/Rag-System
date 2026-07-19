const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Converts a piece of text into a 1536-number vector ("embedding")
// Why: vectors let us compare MEANING (not just exact words) using math —
// similar meaning = numerically close vectors (see cosine similarity)
async function embedText(text) {
  const model = genAI.getGenerativeModel({ model: 'gemini-embedding-001' });

  const result = await model.embedContent({
    content: { parts: [{ text }] },
    // Gemini defaults to 3072 dimensions, but we force 1536
    // so it matches the Qdrant collection size we created
    outputDimensionality: 1536,
  });

  return result.embedding.values;
}

module.exports = { embedText };
