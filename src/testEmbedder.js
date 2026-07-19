const { embedText } = require('./services/embedder');

async function test() {
  try {
    const vector = await embedText('This is a test sentence about leave policy.');
    console.log('✅ Embedding generated successfully',vector);  // 1536 itmes stored vector
    console.log('Vector length:', vector.length); //1536
    console.log('First 5 values:', vector.slice(0, 5));
  } catch (err) {
    console.error('❌ Embedding failed:', err.message);
    console.error('❌ Embedding failed:',err);
  } finally {
    process.exit();
  }
}

test();