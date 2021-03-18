const faker = require('faker');
const uuid = require('uuid').v4;
const path = require('path');

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
  const workspaceLocationsUuid = uuid();
  workspaceLocationsData += `${workspaceLocationsUuid}|${faker.lorem.slug()}|${id}|${rawAddress}|${rawAddress}|${streetName}|${streetNumber}|${neighborhood}|${city}|${state}|United States|US|${zipCode}\n`
  locationPointersData += `${uuid()}|${id}|${faker.address.longitude(-117, -82)}|${faker.address.latitude(33, 41)}|${workspaceLocationsUuid}\n`;

  const rawQuery1 = `COPY public."WorkspaceLocations" ("uuid","workspaceSlug","workspaceId","rawAddress","formattedAddress","streetName","streetNumber","neighborhood","city","state","country","countryCode","zipCode") FROM '${path.join(__dirname, 'workspaceLocations.csv')}' WITH DELIMITER AS '|';`;
  const rawQuery2 = `COPY public."LocationPointers" ("uuid","workspaceId","longitude","latitude","workspaceLocation_id") FROM '${path.join(__dirname, 'locationPointers.csv')}' WITH DELIMITER AS '|';`;

  return {
    workspaceLocationsData,
    locationPointersData,
    rawQuery1,
    rawQuery2
  };
};

module.exports = generatePgData;