//HANDLING DIFFERENT ROUTES

const express = require('express');

const app = express();

//this middleware is called upon each request and then it passes the request onto the next middleware
app.use('/', (req, res, next) => {
    res.send('<h1>Hello from "/" ');
    next();
});

app.use('/add-product', (req, res, next) => {
    res.send('<h1>Hello from "/add-product" ');
});

//this middleware will be executed whenever any url starting from '/' will be called
//middlewares use top down approach
//that's why thus middleware is there at the bottom
app.use('/', (req, res, next) => {
    res.send('<h1>Hello from "/" ');
});

app.listen(5000);