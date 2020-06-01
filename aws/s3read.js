var AWS = require('aws-sdk');
var path = require('path');
var fs = require('fs');
const strategy = 'first';


AWS.config.loadFromPath(path.resolve(__dirname, 'config.json'));

if(strategy === 'first'){
  AWS.config.update({
    accessKeyId: AWS.config.credentials.accessKeyId,
    secretAccessKey: AWS.config.credentials.secretAccessKey,
    region: AWS.config.region
  });
} else {
  AWS.config.getCredentials(err => {
    if(err) console.log(err.stack);
    else {
      console.log("Access key:", AWS.config.credentials.accessKeyId);
      console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
    }
  });
}

var s3 = new AWS.S3();


var params = {
  Bucket: 'jsons.chemas',
  Key: 'firebase_rename_logs.txt'
};

if(strategy === 'first'){
  let readStream = s3.getObject(params).createReadStream();
  let writeStream = fs.createWriteStream(path.join(__dirname, 's3-downloaded-data.txt'));
  readStream.pipe(writeStream);
  readStream.on('end', () => {
    console.log('Read Stream Ended');
  });
  writeStream.on('finish', () => {
    console.log('File Downloaded');
  });
} else {
  s3.getObject(params, (err, data) => {
    if(err) {
      console.log(err);
    } else {
      console.log(data.Body.toString());
    }
  });
}
