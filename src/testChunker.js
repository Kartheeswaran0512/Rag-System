const { chunkText } = require('./services/chunker');

const sampleText = `This is a sample document about company leave policy. 
Employees are entitled to 20 days of paid leave per year. 
Leave requests must be submitted at least 3 days in advance. 
Sick leave is handled separately and requires a medical certificate for more than 2 consecutive days. 
Remote work policy allows employees to work from home twice a week with manager approval.`.repeat(20); // repeated to simulate a longer doc

const chunks = chunkText(sampleText, 50, 10); // small size for easy testing

console.log('Total chunks:', chunks.length);
console.log('First chunk:', chunks[0]);
console.log('---');
console.log('Second chunk:', chunks[1]);