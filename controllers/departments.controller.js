const Department = require('../models/department.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Department.find());
  } catch (err) {
    res.status(500).json({ message : err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random * count);
    const result = await Department.findOne().skip(rand);
    if(!result) res.status(404).json({message : 'Not found'});
    else res.json(result);
  } catch (err) {
    res.status(500).json({message : err});
  }
};

exports.getById = async (req, res) => {
  try {    
    const result = await Department.findById(req.params.id);
    if(!result) res.status(404).json({message: 'Not found'});
    else res.json(result);
  } catch (err) {
    res.status(500).json({message: err});
  }  
}

exports.postOne = async (req, res) => {
  try {
    const { name } = req.body;
    const newDoc = new Department({ name: name });
    await newDoc.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.updateById = async (req, res) => {
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
};

exports.deteleById = async (req, res) => {  
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
};

