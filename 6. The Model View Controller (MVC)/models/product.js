const fs = require('fs'); //to work with the file system
const path = require('path'); //to construct the path

let products = [];

module.exports = class Product {
    constructor(title)
    {
        this.title = title;
    }

    save()
    {
        const p = path.join(__dirname, '../data', 'products.json'); //we want to store our data in json format and here giving path of root directory
        
        fs.readFile(p, (err, fileContent) => { //to read the file content [fileContent] at path [p] 

            if(!err)
            {
                products = JSON.parse(fileContent); //parse function reads the incoming JSON file and returns us JS code or text
            }

            products.push(this); //must use the arrow function for 'this' to work

            fs.writeFile(p, JSON.stringify(products), (err) => console.log(err));
        });
    }

    //function that [fetchAll] will execute once it is done itself
    //[cb] will hold a function
    static fetchAll(cb)
    {
        const p = path.join(__dirname, '../data', 'products.json');

        fs.readFile(p, (err, fileContent) => {
            if(err) //we will still return an array if file is empty
            {
                cb([]); //callBack function
            }
            cb(JSON.parse(fileContent)); //callBack function
        });
    }
};