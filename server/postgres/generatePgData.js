const faker = require('faker');
const uuid = require('uuid').v4;

const amenitiesGenerator = () => {
  const randAmount = Math.floor(Math.random() * (7 - 4) + 4);
  let result = faker.company.catchPhraseAdjective();
  for (let i = 0; i <= randAmount; i++) {
    result += `,${faker.company.catchPhraseAdjective()}`;
  }
  return result;
};

const generatePgData = (id) => {
  let workspaceLocationsData = '';
  let locationPointersData = '';
  const streetNumber = faker.datatype.number(1000);
  const streetName = faker.address.streetName();
  const city = faker.address.city();
  const state = faker.address.stateAbbr();
  const zipCode = faker.address.zipCode().slice(0, 5);
  const amenities = amenitiesGenerator();
  const rate = faker.commerce.price(250, 800);
  const neighborhood = `${faker.address.cardinalDirection()} ${faker.address.citySuffix()}`;
  const rawAddress = `${streetNumber} ${streetName}, ${city}, ${state} ${zipCode}, USA`;
  const locationPointerUuid = uuid();

  locationPointersData += `${locationPointerUuid}|${id}|(${faker.address.longitude(-117, -82)}|${faker.address.latitude(33, 41)})\n`;

  workspaceLocationsData += `${uuid()}|${faker.lorem.slug()}|${id}|${rawAddress}|${rawAddress}|${streetName}|${streetNumber}|${neighborhood}|${city}|${state}|United States|US|${zipCode}|${amenities}|${rate}|${locationPointerUuid}\n`;

  return {
    workspaceLocationsData,
    locationPointersData,
  };
};

module.exports = generatePgData;
