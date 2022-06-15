const fs = require('fs');

const requestHandler = (req, res) => {
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
        const body = []; 
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const mssg = parsedBody.split('=')[1];

            fs.writeFile('data.txt', 'Name :' + mssg, () => {
                res.statusCode = 302; 
                res.setHeader('Location', '/'); 
                return res.end(); 
            });
        });
    }

    res.setHeader('Content-Type', 'text/html'); 
    res.write('<h1>Hello</h1>');
    res.end();
};

module.exports = {
    handler :requestHandler,
    someText :'hello everbody'
};
//'modules' object is exposed globally by node.js
//we here created an object with key value pair so that we can export multiple functions etc.

//OR
//module.exports.handler = requestHandler;
//module.exports.someText = 'hello everbody';

//OR
//exports.handler = requestHandler;
//exports.someText = 'hello everbody';

