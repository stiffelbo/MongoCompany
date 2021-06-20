const express = require('express');
const router = express.Router();

const departmentController = require('../controllers/departments.controller');

router.get('/departments/', departmentController.getAll);

router.get('/departments/random', departmentController.getRandom);

router.get('/departments/:id', departmentController.getById);

router.post('/departments', departmentController.postOne);

router.put('/departments/:id', departmentController.updateById);

router.delete('/departments/:id', departmentController.deteleById);

module.exports = router;
