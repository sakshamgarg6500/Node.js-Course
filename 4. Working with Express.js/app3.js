//PARSING INCOMING REQUEST

const express = require('express');
const bodyParser = require('body-parser'); //npm install --save body-parser

const app = express();

app.use(bodyParser.urlencoded());

app.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

//'app.post' is same as 'app.use' but only be fired for incoming POST request
app.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/', (req, res, next) => {
    res.send('<h1>Product Added</h1>');
});

app.listen(3000);