var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
mongoose.Promise = require('bluebird');
require('dotenv').config();
var AWS = require('aws-sdk');
var sns = new AWS.SNS();
var ddb = new AWS.DynamoDB();


var app = express();
app.use(cors());


// Set evironment
if(process.env.NODE_ENV === 'development'){
  console.log(`This is ${process.env.NODE_ENV} server`);
} else if(process.env.NODE_ENV === 'production'){
  console.log(`This is ${process.env.NODE_ENV} server`);
}

// Connect To mongodb
var { mongoUrl } = require('./config/database');
var db = mongoose.connection;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
db.on('connected', () => {
  if(process.env.NODE_ENV === 'development'){
    mongoose.set('debug', true);
    console.log('Connected to DEVELOPMENT mongodb');
  } else {
    console.log('Connected to PRODUCTION mongodb');
  }
});
db.on('error', (err) => {
  console.log(`Mongoose connection error: ${err.message}`);
});


// View Engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// Set middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Register The Routes
const routes = require('./routes');
routes(app);

// Handle Unknown Routes
app.use(function(req, res, next){
  var err = new Error('File Not Found');
  err.status = 404;
  //console.log('404 Not Found');
  next(err);
});

// Handle Error (define as the last app.use callback)
app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//Start The Server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Server started on port 8080');
});
