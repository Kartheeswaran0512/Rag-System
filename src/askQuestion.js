const { retrieveRelevantChunks } = require('./services/retriever');
const { generateAnswer } = require('./services/generator');

// The complete RAG flow: question -> retrieve -> generate -> answer
async function askQuestion(question) {
  console.log(`\nQuestion: ${question}`);

  // Step 1: Find relevant chunks (what we built earlier)
  const chunks = await retrieveRelevantChunks(question, 3);

  if (chunks.length === 0) {
    console.log('No relevant information found.');
    return;
  }

  // Step 2: Generate a natural language answer using those chunks
  const answer = await generateAnswer(question, chunks);

  console.log(`\nAnswer: ${answer}`);
}

module.exports = { askQuestion };