//SENDING RESPONSE TO THE INCOMING REQUEST

const http = require('http'); 

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html'); //sets 'Content-Type' header to html
    res.write('<h1>Hello</h1>');
    res.end(); //here we end the response and send it to the client  
}); 

server.listen(5000); 