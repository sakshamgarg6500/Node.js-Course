const path = require('path'); //'path' is a node.js core module

const express = require('express');

const router = express.Router();

const adminData = require('./admin');

router.get('/', (req, res, next) => {
    res.render('shop', {prods :adminData.products, pageTitle :"Shop", path : '/'}); //'render' will detect the default templating engine
});

module.exports = router;