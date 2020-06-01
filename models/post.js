var mongoose = require('mongoose');

var postSchema = mongoose.schema({
    userId: String,
    title: String,
    description: String,
    dateTime: Date,
    likes: String,
    comments: String
});

var post = mongoose.model('Post', postSchema);
module.exports = post;
