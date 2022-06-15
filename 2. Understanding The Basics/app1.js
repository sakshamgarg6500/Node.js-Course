//CREATING A NODE SERVER

const http = require('http'); //using a core module

const server = http.createServer((req, res) => {
    console.log(req);
    // process.exit(); //if we want to end our server after handling one request
}); 
//createServer function executes upon each request and triggers the callback function 
//createServer also returns a server so we need to store it in a constant

server.listen(5000); //we listen to requests on this port