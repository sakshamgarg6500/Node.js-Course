//ADDING MIDDLEWARE AND SENDING RESPONSE

//core module imports (node specific modules)
const http = require('http'); 

//third party dependencies
const express = require('express'); //this exports a function

const app = express(); //this initializes an object

//middlewares are functions for handling different requests
//so that instead of one huge function (or one request handler), our code is divided into blocks
//'use' allows us to add a new middleware function
app.use((req, res, next) => {
    console.log('In the middleware');
    next(); //sends request to next middleware
    //if we do not call next 'then' it is mandatory to send response to the client
});

app.use((req, res, next) => {
    console.log('In the next middleware');
    res.send('<h1>Hello from Express.js</h1>'); //sending response to the client
    //no need to set headers because of express
    //by default set to 'html'
});

const server = http.createServer(app); //'app' is a valid request handler so we can create our server
//it sets up a way of handling requests that is a key characterestic of express.js

server.listen(5000);

//instead of the above two lines we can write
//by doing this no need for 'http' core module import
// app.listen(5000);