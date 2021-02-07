const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '../', '.env')});
const AWS = require('aws-sdk');

const bundle = fs.readFileSync(path.join(__dirname, '../', 'client', 'dist', 'nearby.js'));
const css = fs.readFileSync(path.join(__dirname, '../', 'client', 'dist', 'reset.css'));

AWS.config.getCredentials((err) => {
  if (err) console.log('$$$', err);
  else console.log("Access key:", AWS.config.credentials.accessKeyId);
});

const jsName = 'nearby.js';
const cssName = 'reset.css';

const jsObject = {Bucket: process.env.AWS_S3_BUCKET, Key: jsName, Body: bundle.toString()};
const cssObject = {Bucket: process.env.AWS_S3_BUCKET, Key: cssName, Body: css.toString()};

const uploadBundle = async () => new Promise(async (resolve, reject) => {
  const s3 = new AWS.S3({apiVersion: '2006-03-01'});
  try {
    await s3.putObject(jsObject).promise();
    console.log("Successfully uploaded bundle to " + process.env.AWS_S3_BUCKET + "/" + jsName);
    await s3.putObject(cssObject).promise();
    console.log("Successfully uploaded bundle to " + process.env.AWS_S3_BUCKET + "/" + cssName);
    resolve();
  } catch (err) {
    console.log(err)
    reject();
  }
})

// uploadBundle();
exports.upload = uploadBundle;

