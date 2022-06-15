const path = require('path'); //node core module

const express = require('express');  //this exports a function //third party packages
const bodyParser = require('body-parser'); //npm install --save body-parser

const app = express(); //this initializes an object

app.set('view engine', 'pug'); //setting the templating engine
app.set('views', 'views'); //templating engine folder

const adminRoutes = require('./routes/admin'); //importing our own routes file
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');

const mongoose = require('mongoose');
const session = require('express-session'); //importing third party package
const MongoDBStore = require('connect-mongodb-session')(session); //third party package to help us store session in the database to which we pass our [session]
// [MongoDBStore] yields a constructor function
const User = require('./models/user'); //importing the user model

const MONGODB_URI = 'mongodb+srv://saksham:hellcat007@cluster0.mr0lf.mongodb.net/shop';

const store = new MongoDBStore({
    uri: MONGODB_URI, //on which database to your session data
    collection: 'sessions'
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public'))); //anything that tries to find a css file will automatically come into this public folder

//we initialize the session middleware when we start up our server, so that the session can be used for every incoming request
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false, store: store}));
//secret: the string which will be encrypted
//resave: the session will not be saved for every request, instead it will only be saved whenever there is some change in the session
//saveUnitialized also means the same as resave
//store: where to store session data
//[session] middleware sets a cookie by itself 

app.use('/admin', adminRoutes.routes); //url starting with 'admin' will be handeled by this middleware [filtering paths]
app.use(shopRoutes.routes);
app.use(authRoutes);
app.use(errorController.get404);

mongoose.connect(MONGODB_URI)
        .then(() => app.listen(3000))
        .catch(err => console.log(err));