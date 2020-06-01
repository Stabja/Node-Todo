var express = require('express');
var router = express.Router();
var mogoose = require('mongoose');
var Task = require('../models/task');


// Get all tasks
router.get('/', async (req, res) => {
  let tasks = await Task.find({}).sort({ createdAt: -1 }).exec();
  if(!tasks){
    return res.status(500).json({ error: 'Tasks not found' });
  }
  return res.json(tasks);
});

// Get one task
router.get('/task/:id', async (req, res) => {
  let task = await Task.findById(req.params.id).exec();
  if(!task){
    return res.status(500).json({ error: 'Article not found' });
  }
  return res.json(task);
});

// Create task
router.post('/task', async (req, res) => {
  await Task.create(req.body, (err, data) => {
    if(err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
    return res.json(data);
  });
});

// Edit Task
router.put('/task/:id', async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
    if(err){
      return res.status(500).send(err);
    }
    console.log('Updated: ', doc._id);
    return res.json(doc);
  });
});

// Remove Task
router.delete('/task/:id', async (req, res) => {
  await Task.findByIdAndRemove(req.params.id, (err, doc) => {
    if(err){
      return res.status(500).send(err);
    }
    console.log('Removed: ', doc);
    return res.json(doc);
  });
});


module.exports = router;