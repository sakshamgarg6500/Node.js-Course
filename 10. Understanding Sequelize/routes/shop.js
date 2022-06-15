const path = require('path'); 

const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart_delete_item', shopController.postCartDeleteProduct);

router.post('/create_order', shopController.postOrder);

router.get('/orders', shopController.getOrders);

module.exports = router;