const fs = require('fs'); 
const path = require('path'); 

let products = [];

module.exports = class Product {
    constructor(title, image, description, price)
    {
        this.title = title;
        this.image = image;
        this.description = description;
        this.price = price;
    }

    save()
    {
        const p = path.join(__dirname, '../data', 'products.json'); 
        
        fs.readFile(p, (err, fileContent) => {  
            if(!err)
               { products = JSON.parse(fileContent);}
            products.push(this); 
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb)
    {
        const p = path.join(__dirname, '../data', 'products.json');
        fs.readFile(p, (err, fileContent) => {
            if(err) 
                {cb([]);}
            cb(JSON.parse(fileContent)); 
        });
    }
};