const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '../', '.env')});
const AWS = require('aws-sdk');

const bundle = fs.readFileSync(path.join(__dirname, '../', 'client', 'dist', 'nearby.js'));
const css = fs.readFileSync(path.join(__dirname, '../', 'client', 'dist', 'reset.css'));

AWS.config.getCredentials((err) => {
  if (err) console.log('$$$', err);
  else console.log('Access key:', AWS.config.credentials.accessKeyId);
});

const uploadBundle = async () => {
  const jsName = 'nearby.js';
  const cssName = 'reset.css';
  const jsObject = {Bucket: process.env.AWS_S3_BUCKET, Key: jsName, Body: bundle.toString()};
  const cssObject = {Bucket: process.env.AWS_S3_BUCKET, Key: cssName, Body: css.toString()};
  const s3 = new AWS.S3({apiVersion: '2006-03-01'});
  try {
    await s3.putObject(jsObject).promise();
    console.log('Successfully uploaded bundle to ' + process.env.AWS_S3_BUCKET + "/" + jsName);
    await s3.putObject(cssObject).promise();
    console.log('Successfully uploaded bundle to ' + process.env.AWS_S3_BUCKET + "/" + cssName);
  } catch (err) {
    console.log(err)
  }
};

const uploadDev = async () => {
  const jsName = 'dev-nearby.js';
  const jsObject = {Bucket: process.env.AWS_S3_BUCKET, Key: jsName, Body: bundle.toString()};
  const s3 = new AWS.S3({apiVersion: '2006-03-01'});
  try {
    await s3.putObject(jsObject).promise();
    console.log("Successfully uploaded bundle to " + process.env.AWS_S3_BUCKET + "/" + jsName);
  } catch (err) {
    console.log(err);
  }
};


// uploadBundle();
exports.upload = uploadBundle;
exports.uploadDev = uploadDev;

