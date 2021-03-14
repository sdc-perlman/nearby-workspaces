const workspaceLocationOutput = './pgSeedWorkspaceLocations.sql';
// const locationPointerOutput = './pgSeedLocationPointers.sql';
// require('./relationship');
const faker = require('faker');
const fs = require('fs').promises;

const idToStr = id => (id.toString(36).padStart(5, '0'));

(async () => {
  let workspaceLocationsSeedStr = '';
  let locationPointersSeedStr = '';
  fs.writeFile(workspaceLocationOutput, workspaceLocationsSeedStr);
  // fs.writeFile(locationPointerOutput, locationPointersSeedStr);

  let sequentialId = 0;

  for (let i = 0; i < 10; i++) {
    sequentialId++;
    const workspaceId = sequentialId;
    const workspaceSlug = faker.lorem.slug();
    const streetNumber = faker.random.number(1000);
    const streetName = faker.address.streetName();
    const city = faker.address.city();
    const state = faker.address.stateAbbr();
    const zipCode = faker.address.zipCode().slice(0, 5);
    const neighborhood = `${faker.address.direction()} ${city}`;
    const rawAddress = `${streetNumber} ${streetName}, ${city}, ${state} ${zipCode}, USA`
    const formattedAddress = rawAddress;
    const country = 'United States'
    const countryCode = 'US';

    workspaceLocationsSeedStr += `${workspaceSlug}|${workspaceId}|${rawAddress}|${formattedAddress}|${streetName}|${state}|${streetNumber}|${neighborhood}|${city}|${state}|${country}|${countryCode}|${zipCode}\n`;
    console.log(workspaceLocationsSeedStr);

    // locationPointersSeedStr += `${getRandomWords()}|${workspaceId}\n`;

    // if (sequentialId % 100 > 100 - 6) {
    //   try {
        await fs.appendFile(workspaceLocationOutput, workspaceLocationsSeedStr);
        // await fs.appendFile(locationPointerOutput, locationPointersSeedStr);
        workspaceLocationsSeedStr = '';
        locationPointersSeedStr = '';
    //   } catch (err) {
    //     console.log('Error writing seed script file', err);
    //   }
    // }
  }




})();