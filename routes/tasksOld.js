var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var moment = require('moment');
var { dev, prod } = require('../config/dbConfig.json');


let mongoUrl = null;
if(process.env.NODE_ENV === 'development'){
  mongoUrl = `mongodb://${dev.host}:${dev.port}/${dev.database}`;
  console.log('Connected to DEVELOPMENT db');
} else {
  mongoUrl = `mongodb://${prod.username}:${prod.password}@${prod.host}:${prod.port}/${prod.database}`;
  console.log('Connected to PRODUCTION db');
}

// Connect to Mongojs
var db = mongojs(mongoUrl, ['tasks']);


//Get All Tasks
router.get('/', function(req, res){
  db.tasks.find({}, function(err, tasks){
    if(err){
      res.send(err);
    }
    else{
      res.json(tasks);
    }
  });
});

//Get Single Task
router.get('/task/:id', function(req, res){
  var id = req.params.id;
  console.log(id);
  db.tasks.findOne({_id: mongojs.ObjectId(id)}, function(err, task){
    if(err){
      res.send(err);
    }
    res.json(task);
    console.log(task);
  });
});

//Create Task
router.post('/task', function(req, res, next){
  var newTask = req.body;
  console.log(req.body);
  if(!newTask.title){
    res.status(400);
    res.json({
      "error": "Bad Data"
    });
  } else {
    res.status(201);
    newTask['createdAt'] = moment().format();
    console.log(newTask['createdAt']);
    db.tasks.save(newTask, function(err, task){
      if(err){
        res.send(err);
      } else {
        res.json(task)
      }
    });
    console.log('Created');
  }
});

//Update Task
router.put('/task/:id', function(req, res, next){
  var task = req.body;
  console.log(req.body);
  var updTask = {};
  if(task.isDone){
    updTask.isDone = task.isDone;
  }
  if(task.title){
    updTask.title = task.title;
  }
  if(!updTask){
    res.status(400);
    res.json({
      "error": "Bad Data"
    });
    console.log(data);
  } else {
    var id = req.params.id;
    console.log(id);
    db.tasks.update({_id: mongojs.ObjectId(id)}, updTask, {}, function(err, task){
      if(err){
        res.send(err);
      }
      res.json(task);
    });
    console.log('Updated');
  }
});

//Delete Task
router.delete('/task/:id', function(req, res, next){
    var id = req.params.id;
    console.log(id);
    db.tasks.remove({_id: mongojs.ObjectId(id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
    console.log('Deleted');
});


module.exports = router;