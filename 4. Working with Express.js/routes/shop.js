const path = require('path'); //'path' is a node.js core module

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html')); //path.join detects the operating system and then there is no need to add slashes
});

module.exports = router;