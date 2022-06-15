//ROUTING REQUESTS
//sending response to the incoming request depending upon the url

const http = require('http'); 

const server = http.createServer((req, res) => {
    const url = req.url;
    if(url === '/')
    {
        res.setHeader('Content-Type', 'text/html'); 
        res.write('<form action="/message" method="POST"><input type="text"><button type="submit">Submit</button></form>');
        return res.end(); //if we do not write return here then it will continue to run the below statements even if the condition is true
    }
    res.setHeader('Content-Type', 'text/html'); 
    res.write('<h1>Hello</h1>');
    res.end();
}); 

server.listen(5000);