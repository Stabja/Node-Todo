var mongoose = require('mongoose');

var schema = mongoose.Schema;

var eventSchema = new schema({
    title: String,
    description: String,
    from: Date,
    to: Date,
    allDay: Boolean
});

var event = mongoose.model('Event', eventSchema);
module.exports = event;
