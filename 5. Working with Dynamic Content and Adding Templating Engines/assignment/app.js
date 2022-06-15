const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const userPage = require('./routes/users.js');
const homePage = require('./routes/home');

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded());

app.use('/users', userPage.routes);
app.post('/', homePage.routes);

app.use('/', (req, res, next) => {
    res.send('<h1>No Users</h1>');
});

app.listen(3000);