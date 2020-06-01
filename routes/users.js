var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');


//GetAll
router.get('/', function(req, res){
  User.find(function(err, users){
    if(err){
      res.send(err);
    } else {
      res.json(users);
    }
  });
});

//Get
router.get('/user/:id', function(req, res){
  User.findOne({ _id: req.params.id }, function(err, user){
    if(err){
      res.send(err);
    } else {
      res.json(user);
    }
  });
});

//Post
router.post('/user', function(req, res){
  var userModel = req.body;
  /*var userModel = new User(req.body);
  userModel.save();*/
  User.save(userModel, function(err, user){
    if(err){
      res.send(err);
    } else {
      res.json(user);
    }
  });
});

//Put
router.put('/user/:id', function(req, res){
  User.findById(req.params,id, function(err, user){
    if(err){
      res.send(err);
    } else {
      User.save(function(err, user){
        if(err){
          res.send(err);
        } else {
          res.json(user);
        }
      });
    }
  });
});

//Delete
router.delete('/user/:id', function(req, res){
  User.findByIdAndRemove(req.params.id, function(err, user){
    if(err){
      res.send(err);
    } else {
      res.json(user);
    }
  });
});


module.exports = router;

