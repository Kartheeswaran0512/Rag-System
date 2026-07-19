const { askQuestion } = require('./askQuestion');

async function test() {
  await askQuestion('How many days of leave do employees get?');
  process.exit();
}

test();