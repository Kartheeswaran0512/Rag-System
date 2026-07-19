const { retrieveRelevantChunks } = require('./services/retriever');

async function test() {
  const question = 'How many days of leave do employees get?';
  const results = await retrieveRelevantChunks(question, 3);

  console.log(`Question: ${question}\n`);
  console.log('Top matching chunks:\n');

  results.forEach((chunk, i) => {
    console.log(`--- Match ${i + 1} (score: ${chunk.score}) ---`);
    console.log(chunk.chunk_text);
    console.log('');
  });

  process.exit();
}

test();