const path = require('path'); //node core module

const express = require('express');  //this exports a function //third party packages
const bodyParser = require('body-parser'); //npm install --save body-parser

const app = express(); //this initializes an object

app.set('view engine', 'pug'); //setting the templating engine
app.set('views', 'views'); //templating engine folder

const adminRoutes = require('./routes/admin'); //importing our own routes file
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

const databaseConnection = require('./util/database'); //importing our database //[mongoConnect] imports a function
const User = require('./models/user');

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public'))); //anything that tries to find a css file will automatically come into this public folder

app.use((req, res, next) => {
    User.findById('60951b7a7a1d090bab3faac8') //obtaining user from the database
        .then(user => {
            //creating [User] object and pasing it to the request
            req.user = new User(user.name, user.email, user.cart, user._id);//now the [req.user] contains data as well as models
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes.routes); //url starting with 'admin' will be handeled by this middleware [filtering paths]
app.use(shopRoutes.routes);
app.use(errorController.get404);

databaseConnection.mongoConnect(() => app.listen(3000));