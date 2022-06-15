//INPUT DATA FROM USER USING HTML FORM AND STORE IT IN A FILE AND THEN REDIRECT THE USER TO HOME PAGE

const http = require('http'); 
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/')
    {
        res.setHeader('Content-Type', 'text/html'); 
        res.write('<form action="/message" method="POST"><input type="text" name="mssg"><button type="submit">Submit</button></form>');
        return res.end(); 
    }
    
    if(url ==='/message' && method === 'POST')
    {
        const body = []; //defining an empty array
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const mssg = parsedBody.split('=')[1];
            fs.writeFileSync('data.txt', 'Name :' + mssg); //creating a file and writing data onto that
        });

        //below written code executes before the above function
        res.statusCode = 302; //status code for redirection
        res.setHeader('Location', '/'); //'Location' is a predefined header
        return res.end(); //sending the response does not mean that our event listeners are dead 
    }

    res.setHeader('Content-Type', 'text/html'); 
    res.write('<h1>Hello</h1>');
    res.end();
}); 

server.listen(5000);