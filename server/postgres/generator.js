const fs = require('fs');
const faker = require('faker');
const argv = require('yargs').argv;

const lines = argv.lines || 1000000;
const filename = argv.output || 'posts.csv';
const stream = fs.createWriteStream(filename);

const createPost = () => {
  // const streetNumber = faker.random.number(1000);
  // const streetName = faker.address.streetName();
  // const city = faker.address.city();
  // const state = faker.address.stateAbbr();
  // const zipCode = faker.address.zipCode().slice(0, 5);
  // const neighborhood = `${faker.address.direction()} ${city}`;
  // const rawAddress = `${streetNumber} ${streetName}, ${city}, ${state} ${zipCode}, USA`;
  const userId = faker.random.number(10);
  const title = faker.hacker.phrase();
  const content = faker.lorem.paragraph();
  const image = faker.image.image();
  const date = faker.date.recent();

  return `${userId},${title},${content},${image},${date}\n`;
};

const startWriting = (writeStream, encoding, done) => {
  let i = lines;
  const writing = () => {
    let canWrite = true;
    do {
      i--;
      let post = createPost();
      //check if i === 0 so we would write and call `done`
      if (i === 0) {
        // we are done so fire callback
        writeStream.write(post, encoding, done);
      } else {
        // we are not done so don't fire callback
        writeStream.write(post, encoding);
      }
      //else call write and continue looping
    } while (i > 0 && canWrite);
    if (i > 0 && !canWrite) {
      //our buffer for stream filled and need to wait for drain
      // Write some more once it drains.
      writeStream.once('drain', writing);
    }
  };
  writing();
};

//write our `header` line before we invoke the loop
stream.write('userId,title,content,image,date\n', 'utf-8');
//invoke startWriting and pass callback
startWriting(stream, 'utf-8', () => {
  stream.end();
});
