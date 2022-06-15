const path = require('path'); //'path' is a node.js core module

const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products');

router.get('/', productsController.getProducts);

module.exports = router;