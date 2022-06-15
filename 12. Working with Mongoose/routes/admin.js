const express = require('express');

const router = express.Router(); //this Router is like a tiny express app linked to upper express app

const adminController = require('../controllers/admin');

//'router' is same as 'app'
router.get('/add_product', adminController.getAddProduct); //this will handle only a 'get' request

//path name is same but request handling method is different
router.post('/add_product', adminController.postAddProduct); //this will handle only a 'post' request

router.get('/product_list', adminController.getProducts);

router.get('/edit_product/:productId', adminController.getEditProduct);

router.post('/edit_product', adminController.postEditProduct);

router.post('/delete_product', adminController.postDeleteProduct);

exports.routes = router;