const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: 'newRecordIds.csv',
  header: [
    { id: 'workspaceId', title: 'workspaceId' },
  ],
});

const numGen = () => {
  const data = [];
  let workspaceId = 10000000;
  while (workspaceId <= 11000000) {
    data.push({ workspaceId });
    workspaceId++;
  }
  return data;
};

csvWriter
  .writeRecords(numGen())
  .then(() => console.log('The CSV file was written successfully'));
