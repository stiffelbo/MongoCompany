const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employees.controller');

router.get('/employees', employeesController.getAll);

router.get('/employees/random', employeesController.getRandom);

router.get('/employees/:id', employeesController.getById);

router.post('/employees', employeesController.postOne);

router.put('/employees/:id', employeesController.updateById);

router.delete('/employees/:id', employeesController.deteleById);

module.exports = router;