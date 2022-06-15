const reqHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    
    if(url === '/')
    {
        res.setHeader('Content-type', 'text/html');
        res.write('<form method="POST" action="/create-user"><input type="text" name="mssg"><button type="submit">Submit</button></input></form>')
        res.end();
    }
    
    if(url === '/users')
    {
        res.setHeader('Content-type', 'text/html');
        res.write('<ul><li>User 1</li><li>User 2</li></ul');
        res.end();
    }

    if(url === '/create-user' && req.method === 'POST')
    {
        const body = [];
        /* res.setHeader('Content-type', 'text/html');
        res.write('<h1>User Created</h1>'); */

        res.statusCode = 302;
        res.setHeader('Location', '/');

        req.on('data', (chunk) => { //will be fored whenever a chunk is ready to be read
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString(); //this will create a buffer and all the chunks from body to it
            const name = parsedBody.split('=')[1];
            console.log(name); 
        });

        // return res.end();
        res.end();
    }
};


module.exports = reqHandler;