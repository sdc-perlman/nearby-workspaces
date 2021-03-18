const createDB = require('./');
const generateCouchData = require('./generateCouchData');
const argv = require('yargs').argv;
const lines = argv.lines || 100;
const batchSize = 1000;

let workspaceId = 1;

(async () => {
  const workspaces = await createDB();
  let docs = [];
  let batch = 0;
  for(let i = 1; i <= 1000000; i++) {
    const dataFormat = generateCouchData(i);
    docs.push(dataFormat);
    batch++;
    if(batch === batchSize) {
      try {
        await workspaces.bulk({ docs });
      } catch(err) {
        console.log(err);
        process.exit();
      }
      batch = 0;
      docs = [];
    }
  }
  process.exit();
})();