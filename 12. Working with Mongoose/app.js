const path = require('path'); //node core module

const express = require('express');  //this exports a function //third party packages
const bodyParser = require('body-parser'); //npm install --save body-parser

const app = express(); //this initializes an object

app.set('view engine', 'pug'); //setting the templating engine
app.set('views', 'views'); //templating engine folder

const adminRoutes = require('./routes/admin'); //importing our own routes file
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

const mongoose = require('mongoose');
const User = require('./models/user'); //importing the user model

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public'))); //anything that tries to find a css file will automatically come into this public folder

app.use((req, res, next) => {
    User.findById('6097d2b8fa11d02384f03455') //obtaining user from the database
        .then(user => {
            //creating [User] object and pasing it to the request
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes.routes); //url starting with 'admin' will be handeled by this middleware [filtering paths]
app.use(shopRoutes.routes);
app.use(errorController.get404);

mongoose.connect('mongodb+srv://saksham:hellcat007@cluster0.vm1ao.mongodb.net/shop')
        .then(() => {
            User.findOne() //returns the first document that it finds
                .then(user => {
                    if(!user) //if user does not exist
                    {
                        const user = new User({
                            name: 'Saksham',
                            email: 'saksham@gamil.com',
                            cart: {
                                items: []
                            }
                        });
                        user.save();
                    }
                });
            app.listen(3000);
        })
        .catch(err => console.log(err));