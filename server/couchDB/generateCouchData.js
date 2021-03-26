const faker = require('faker');

const generateCouchData = (id) => {
  const streetNumber = faker.random.number(1000);
  const streetName = faker.address.streetName();
  const city = faker.address.city();
  const state = faker.address.stateAbbr();
  const zipCode = faker.address.zipCode().slice(0, 5);
  const neighborhood = `${faker.address.direction()} ${city}`;
  const rawAddress = `${streetNumber} ${streetName}, ${city}, ${state} ${zipCode}, USA`;
  const coordinates = [faker.address.longitude(-117, -82), faker.address.latitude(33, 41)];
  const dataFormat = {
    _id: id.toString(),
    workspaceSlug: faker.lorem.slug(),
    rawAddress,
    formattedAddress: rawAddress,
    streetNumber,
    streetName,
    neighborhood,
    city,
    state,
    country: 'United States',
    countryCode: 'US',
    zipCode,
    coordinates,
  };
  return dataFormat;
};

module.exports = generateCouchData;
