let mongoose = require('mongoose');
var { dev, prod } = require('./dbConfig.json');

const getDBCredentials = () => {
  let mongoUrl = null;
  if(process.env.NODE_ENV === 'development'){
    mongoUrl = `mongodb://${dev.host}:${dev.port}/${dev.database}`;
  } else {
    mongoUrl = `mongodb://${prod.username}:${prod.password}@${prod.host}:${prod.port}/${prod.database}`;
  }
  return { mongoUrl };
}

const { mongoUrl } = getDBCredentials();

module.exports = {
  mongoUrl,
  dev,
  prod
}