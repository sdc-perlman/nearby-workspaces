const faker = require('faker');
const WorkspaceLocation = require('./models');

console.log(`${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode().slice(0, 5)}, USA`);
process.exit();