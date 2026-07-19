// function chunkText(text, chunkSize = 500, overlap = 50) {
//   const words = text.split(/\s+/);
//   const chunks = [];

//   let start = 0;
//   while (start < words.length) {
//     const end = start + chunkSize;
//     const chunkWords = words.slice(start, end);
//     chunks.push(chunkWords.join(' '));

//     start += chunkSize - overlap;
//   }

//   return chunks;
// }

// module.exports = { chunkText };

// Splits a long document into smaller overlapping pieces ("chunks")
// Why: LLMs and vector search work better on focused, bite-sized text
// rather than one giant document
function chunkText(text, chunkSize = 500, overlap = 50) {
  // Break the document into individual words
  const words = text.split(/\s+/);
  const chunks = [];

  let start = 0;
  while (start < words.length) {
    const end = start + chunkSize;
    const chunkWords = words.slice(start, end);
    chunks.push(chunkWords.join(' '));

    // Move forward by (chunkSize - overlap), NOT by chunkSize alone.
    // This means the next chunk re-includes the last `overlap` words
    // of the current chunk — so a sentence/idea cut at the boundary
    // still appears complete in at least one chunk.
    start += chunkSize - overlap;
  }

  return chunks;
}

module.exports = { chunkText };
