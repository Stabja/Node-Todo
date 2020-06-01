var AWS = require('aws-sdk');
var uuid = require('uuid');
var path = require('path');
var fs = require('fs');
var bucketName = 'node-sdk-sample-' + uuid.v4();
var keyName = 'hello_world.txt';

AWS.config.loadFromPath(path.join(__dirname, 'config.json'));

AWS.config.update({
  accessKeyId: AWS.config.credentials.accessKeyId,
  secretAccessKey: AWS.config.credentials.secretAccessKey,
  region: AWS.config.region
});

var s3 = new AWS.S3();

const createNewBucketandUpload = () => {
  s3.createBucket({Bucket: bucketName})
    .promise()
    .then((data) => {
      var objectParams = {
        Bucket: bucketName, 
        Key: keyName, 
        Body: 'Hello World!'
      };
      s3.putObject(objectParams)
        .promise()
        .then((data) => {
          console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
        })
        .catch(err => {
          console.error(err, err.stack);
        });
    })
    .catch(err => {
      console.error(err, err.stack);
    });
};

const uploadFile = () => {
  const filePath = path.join(__dirname, 'uploadFile.json');
  const bucket = 'node-sdk-sample-945bef6b-6599-4f00-b605-99c8093f3e65';
  const key = 'data/data.json';
  fs.readFile(filePath, (err, data) => {
    if(err) console.error(err);
    var base64data = new Buffer(data, 'binary');
    var params = {
      Bucket: bucket,
      Key: key,
      Body: base64data
    };
    s3.upload(params, (err, data) => {
      if(err) console.error(`Upload Error ${err}`);
      console.log('Upload Completed');
    });
  });
};

const downloadFile = () => {
  const filePath = path.join(__dirname, 'downloadedFile.json');
  const bucket = 'node-sdk-sample-945bef6b-6599-4f00-b605-99c8093f3e65';
  const key = 'data/data.json';
  const params = {
    Bucket: bucket,
    Key: key
  };
  s3.getObject(params, (err, data) => {
    if(err) console.error(err);
    fs.writeFileSync(filePath, data.Body.toString());
    console.log(`${filePath} has been created!`);
  });
};
