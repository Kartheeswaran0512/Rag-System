const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Takes the user's question + retrieved chunks, and generates
// a natural language answer grounded in that retrieved context
async function generateAnswer(question, retrievedChunks) {
  // Combine all retrieved chunk texts into one context block
  const context = retrievedChunks
    .map((chunk, i) => `[Source ${i + 1}]: ${chunk.chunk_text}`)
    .join('\n\n');

  // Build the prompt — this is the "Augmented" part of RAG:
  // we're feeding the LLM real data instead of letting it guess
  const prompt = `You are a helpful assistant. Answer the question using ONLY the context below. 
If the context doesn't contain the answer, say "I don't have enough information to answer that."

Context:
${context}

Question: ${question}

Answer:`;

  const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });
  const result = await model.generateContent(prompt);

  return result.response.text();
}

module.exports = { generateAnswer };