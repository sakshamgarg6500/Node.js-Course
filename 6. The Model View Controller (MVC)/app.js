const path = require('path'); 

const express = require('express'); 
const bodyParser = require('body-parser'); 

const app = express();

app.set('view engine', 'pug'); 
app.set('views', 'views');

const adminRoutes = require('./routes/admin'); 
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public'))); 

app.use('/admin', adminRoutes.routes); 
app.use(shopRoutes);
app.use(errorController.get404);

app.listen(3000);