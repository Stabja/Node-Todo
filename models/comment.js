var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    userId: String,
    message: String,
    dateTime: Date
});

var comment = mongoose.model('Comment', commentSchema);
module.exports = comment;
