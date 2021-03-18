const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const uuid = require('uuid').v4;
const nano = require('nano')(`http://munzmoses:${process.env.COUCHDB_PW}@localhost:5984`);

const createDB = async() => {
  try {
    await nano.db.destroy('workspaces');
    await nano.db.create('workspaces');
    const workspaces = await nano.use('workspaces');
    return workspaces;
  } catch(err) {
    console.log(err);
  }
}

module.exports = createDB;
