const path = require('path'); //node core module

const express = require('express'); //third party packages
const bodyParser = require('body-parser'); 

const app = express();

const adminRoutes = require('./routes/admin'); //importing our own routes file
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public'))); //anything that tries to find a css file will automatically come into this public folder

app.use('/admin', adminRoutes); //url starting with 'admin' will be handeled by this middleware [filtering paths]
app.use(shopRoutes);

app.use((req, res, next) => { //for catching all unhandeled requests
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000); //creating server