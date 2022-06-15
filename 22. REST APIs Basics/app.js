const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');

const app = express();

app.use(bodyParser.json()); //to parse json data from incoming request
app.use('/images', express.static(path.join(__dirname, 'images'))); //this [images] folder will be served statically for the requests with [/images]

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //[setHeader] only adds new headers
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message: message});
});

mongoose.connect('mongodb+srv://saksham:hellcat007@cluster0.tu5io.mongodb.net/messages?authSource=admin&replicaSet=atlas-mireln-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true')
    .then(() => app.listen(8080))
    .catch(err => console.log(err));