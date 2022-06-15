const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const user = [];

router.post('/', (req, res, next) => {
    user.push(req.body.title);
    res.render('user', {pageTitle : 'Home', users : user});
});

exports.routes = router;