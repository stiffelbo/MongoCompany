Employee = require('../models/employee.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Employee.find().populate('department'));
  } catch (err) {
    res.status(500).json({message : err});
  }  
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random * count);
    const result = await Employee.findOne().skip(rand).populate('department');
    if(!result) res.status(404).json({message : 'Not found'});
    else res.json(result);
  } catch (err) {
    res.status(500).json({message : err});
  }
};

exports.getById = async (req, res) => {
  try {    
    const result = await Employee.findById(req.params.id).populate('department');
    if(!result) res.status(404).json({message: 'Not found'});
    else res.json(result);
  } catch (err) {
    res.status(500).json({message: err});
  }  
};

exports.postOne = async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;    
    const newDoc = new Employee({ firstName, lastName, department });
    await newDoc.save();
    res.json(newDoc);
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.updateById = async (req, res) => {
  const { firstName, lastName, department } = req.body;
  try {
    const result = await Employee.findById(req.params.id);
    if(result){
      await Employee.updateOne({_id: req.params.id}, {$set: { firstName, lastName, department }});
      const updated = await Employee.findById(req.params.id).populate('department');
      res.json(updated);
    }
    else res.status(404).json({message: 'Not found'});
  } catch (err) {
    res.status(500).json({message: err});
  }  
};

exports.deteleById = async (req, res) => {  
  try {
    const result = await Employee.findById(req.params.id).populate('department');
    if(result){
      await Employee.deleteOne({_id: req.params.id});
      res.json(result);
    }
    else res.status(404).json({message: 'Not found'});
  } catch (err) {
    res.status(500).json({message: err});
  }  
};