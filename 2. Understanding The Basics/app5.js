//UNDERSTANDING EVENT DRIVEN CODE EXECUTION
//this is the same program as app4.js but with some changes 

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
        const body = []; 
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        //by writing 'return' keyword, the last three lines of code are not executed
        //if we do not write 'return', then the below callback function will be executed after the last three lines
        //this is because with event listeners, in cases like below when a function is being passed to a function, node.js registers the event listener but does not execute the callback functions immediately. This is called asynchronous behaviour.
        //instead after parsing the body, it then executes the functions which is already too late in this case if there is no 'return' keyword 
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const mssg = parsedBody.split('=')[1];
            fs.writeFile('data.txt', 'Name :' + mssg, () => {
                //we moved below three statements into the function
                res.statusCode = 302; 
                res.setHeader('Location', '/'); 
                return res.end();
                //now this callback function will not be executed immediately but will execute after we are done working will the file
                //this is the advantage of node.js that it doen not block the server but gives way to other requests as well (kind of multithreading)
                //node.js is synchronous in nature
            }); //we also have a 'writeFileSync' method which blocks the execution of next line of code until it has completed its execution
        });
    }

    //these three lines do not get executed because of the 'return' keyword with 'req.on' event listener
    res.setHeader('Content-Type', 'text/html'); 
    res.write('<h1>Hello</h1>');
    res.end();
}); 

server.listen(5000);