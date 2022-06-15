const path = require('path');

const express = require('express');

const router = express.Router(); //this Router is like a tiny express app linked to upper express app

//'router' is same as 'app'
router.get('/add-product', (req, res, next) => { //this will handle only a 'get' request
    res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
});

//path name is same but request handling method is different
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;