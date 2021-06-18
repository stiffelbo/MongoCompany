const express = require('express');
const router = express.Router();
const Department = require('../models/department.model');

router.get('/departments', async (req, res) => {
  try {
    res.json(await Department.find());
  } catch (err) {
    res.status(500).json({message : err});
  }
});

router.get('/departments/random', async (req, res) => {
  try {
    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random * count);
    const result = await Department.findOne().skip(rand);
    if(!result) res.status(404).json({message : 'Not found'});
    else res.json(result);
  } catch (err) {
    res.status(500).json({message : err});
  }
});

router.get('/departments/:id', async (req, res) => {
  try {
    //mogoose inside findById provides coversion to ObjectId
    const result = await Department.findById(req.params.id);
    if(!result) res.status(404).json({message: 'Not found'});
    else res.json(dep);
  } catch (err) {
    res.status(500).json({message: err});
  }  
});

router.post('/departments', async (req, res) => {
  try {
    const { name } = req.body;
    const newDoc = new Department({ name: name });
    await newDoc.save();
    res.json(newDoc);
  } catch(err) {
    res.status(500).json({ message: err });
  }
});

router.put('/departments/:id', async (req, res) => {
  const { name } = req.body;
  try {
    const result = await Department.findById(req.params.id);
    if(result){
      await Department.updateOne({_id: req.params.id}, {$set: {name: name}});
      const updated = await Department.findById(req.params.id);
      res.json(updated);
    }
    else res.status(404).json({message: 'Not found'});
  } catch (err) {
    res.status(500).json({message: err});
  }  
});

router.delete('/departments/:id', async (req, res) => {  
  try {
    const result = await Department.findById(req.params.id);
    if(result){
      await Department.deleteOne({_id: req.params.id});
      res.json(result);
    }
    else res.status(404).json({message: 'Not found'});
  } catch (err) {
    res.status(500).json({message: err});
  }  
});

module.exports = router;
