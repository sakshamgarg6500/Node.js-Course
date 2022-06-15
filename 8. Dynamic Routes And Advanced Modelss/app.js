const path = require('path'); //node core module

const express = require('express');  //third party packages
const bodyParser = require('body-parser'); 

const app = express();

app.set('view engine', 'pug'); //setting the templating engine
app.set('views', 'views'); //templating engine folder

const adminRoutes = require('./routes/admin'); //importing our own routes file
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public'))); //anything that tries to find a css file will automatically come into this public folder

app.use('/admin', adminRoutes.routes); //url starting with 'admin' will be handeled by this middleware [filtering paths]
app.use(shopRoutes);
app.use(errorController.get404);

app.listen(3000);