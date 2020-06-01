var index = require('./routes/index');
var tasks = require('./routes/tasks');
var users = require('./routes/users');
var articles = require('./routes/articles');


module.exports = (app) => {
  app.use('/', index);
  app.use('/api/tasks', tasks);
  app.use('/api/users', users);
  app.use('/api/articles', articles);
};