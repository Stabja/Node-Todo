var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: String,
  email: String,
  bio: String,
  location: String,
});

module.exports = mongoose.model('User', userSchema);