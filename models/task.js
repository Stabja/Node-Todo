var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
    title: String,
    done: Boolean,
    userId: String,
    projectId: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
