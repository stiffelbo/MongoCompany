const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');

router.get('/products', async (req, res) => {
  try {
    res.json(await Product.find());
  } catch (err) {
    res.status(500).json({message : err});
  }  
});

router.get('/products/random', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random * count);
    const result = await Product.findOne().skip(rand);
    if(!result) res.status(404).json({message : 'Not found'});
    else res.json(result);
  } catch (err) {
    res.status(500).json({message : err});
  }
});

router.get('/products/:id', async (req, res) => {
  try {    
    const result = await Product.findById(req.params.id);
    if(!result) res.status(404).json({message: 'Not found'});
    else res.json(result);
  } catch (err) {
    res.status(500).json({message: err});
  }  
});

router.post('/products', async (req, res) => {
  try {
    const { name, client }  = req.body;
    const newDoc = new Product({ name, client } );
    await newDoc.save();
    res.json(newDoc);
  } catch(err) {
    res.status(500).json({ message: err });
  }
});

router.put('/products/:id', async (req, res) => {
  const { name, client } = req.body;
  try {
    const result = await Product.findById(req.params.id);
    if(result){
      await Product.updateOne({_id: req.params.id}, {$set: { name, client }});
      const updated = await Product.findById(req.params.id);
      res.json(updated);
    }
    else res.status(404).json({message: 'Not found'});
  } catch (err) {
    res.status(500).json({message: err});
  }  
});

router.delete('/products/:id', async (req, res) => {  
  try {
    const result = await Product.findById(req.params.id);
    if(result){
      await Product.deleteOne({_id: req.params.id});
      res.json(result);
    }
    else res.status(404).json({message: 'Not found'});
  } catch (err) {
    res.status(500).json({message: err});
  }  
});

module.exports = router;
