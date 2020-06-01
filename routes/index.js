var express = require('express');
var router = express.Router();




router.get('/', function(req, res){
  console.log("Rendering index.ejs");
  return res.render('index.ejs');
});

router.get('/tasks', function(req, res){
  console.log('Rendering /tasks');
  return res.render('index.ejs');
});

router.get('/dashboard', function(req, res){
  console.log('Rendering Dasboard.ejs');
  return res.render('dashboard.ejs');
});

router.get('/about', function(req, res){
  console.log("Rendering about.ejs");
  return res.render('about.ejs');
});

router.get('/contact', function(req, res){
  console.log("Rendering contact.ejs");
  return res.render('contact.ejs');
});

router.get('/register', function(req, res, next){
  console.log("Rendering register.ejs");
  return res.render('register.ejs');
});

router.get('/login', function(req, res, next){
  console.log("Rendering login.ejs");
  return res.render('login.ejs');
});

module.exports = router;
