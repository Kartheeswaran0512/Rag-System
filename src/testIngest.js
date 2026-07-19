const { ingestDocument } = require('./ingestDocument');

const sampleDoc = `Company Leave Policy: Employees are entitled to 20 days of paid annual leave. 
Leave requests must be submitted at least 3 days in advance through the HR portal. 
Sick leave requires a medical certificate for absences longer than 2 days. 
Remote work is allowed twice a week with prior manager approval. 
All leave balances reset at the start of each calendar year.`;

ingestDocument(sampleDoc, 'leave_policy.txt')
  .then(() => process.exit())
  .catch(err => {
    console.error('Ingestion failed:', err);
    process.exit(1);
  });