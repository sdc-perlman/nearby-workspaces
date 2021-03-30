const faker = require('faker');
const uuid = require('uuid').v4;

const generatePgData = (id) => {
  let workspaceLocationsData = '';
  let locationPointersData = '';
  const streetNumber = faker.random.number(1000);
  const streetName = faker.address.streetName();
  const city = faker.address.city();
  const state = faker.address.stateAbbr();
  const zipCode = faker.address.zipCode().slice(0, 5);
  const neighborhood = `${faker.address.direction()} ${city}`;
  const rawAddress = `${streetNumber} ${streetName}, ${city}, ${state} ${zipCode}, USA`;
  const locationPointerUuid = uuid();

  locationPointersData += `${locationPointerUuid}|${id}|POINT(${faker.address.longitude(-117, -82)} ${faker.address.latitude(33, 41)})\n`;

  workspaceLocationsData += `${uuid()}|${faker.lorem.slug()}|${id}|${rawAddress}|${rawAddress}|${streetName}|${streetNumber}|${neighborhood}|${city}|${state}|United States|US|${zipCode}|${locationPointerUuid}\n`;

  return {
    workspaceLocationsData,
    locationPointersData,
  };
};

module.exports = generatePgData;
