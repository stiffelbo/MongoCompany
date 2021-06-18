const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products.controller');

router.get('/products', productsController.getAll );

router.get('/products/random', productsController.getRandom );

router.get('/products/:id', productsController.getById );

router.post('/products', productsController.postOne);

router.put('/products/:id', productsController.updateById);

router.delete('/products/:id', productsController.deteleById);

module.exports = router;
