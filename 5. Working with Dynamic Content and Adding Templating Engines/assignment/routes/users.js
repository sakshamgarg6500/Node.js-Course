const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.urlencoded());

router.use('/', (req, res, next) => {
    res.render('enter', {pageTitle :'Enter'});
});

exports.routes = router;