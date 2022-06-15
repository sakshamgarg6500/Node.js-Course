const fs = require('fs'); //to work with the file system
const path = require('path');
const Cart = require('./cart');

const p = path.join(__dirname, '../data', 'products.json');  //we want to store our data in json format and here giving path of root directory

//function that [fetchAll] will execute once it is done itself
//[cb] will hold a function
const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => { //to read the file content [fileContent] at path [p] 
        if (err) 
        {
            cb([]);
        } 
        else 
        {
            cb(JSON.parse(fileContent)); //parse function reads the incoming JSON file and returns us JS code or text
        }
    });
};
  
module.exports = class Product { //declaration of class
    constructor(id, title, image, description, price) { //object instantiation
        this.id = id;
        this.title = title;
        this.image = image;
        this.description = description;
        this.price = price;
    }
  
    save() 
    {
        //empty array will be returned to [products] if file is empty or some data if file contains information
        getProductsFromFile(products => { //[products] will contain the data retrieved from file
            if(this.id) //if product exists
            {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                products[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(products), err => console.log(err));
            }
            else //if product does not exist
            {
                this.id = Math.random().toString(); 
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => console.log(err));
            }
         });
    }
  
    static fetchAll(cb) 
    {
        getProductsFromFile(cb);
    }

    static deleteById(id)
    {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(prod => prod.id !== id); //filter will find all the products execpt the product with [id]
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if(!err)
                {
                    Cart.deleteProduct(id, product.price);
                }
            });
        });
    }

    static findById(id, cb) //get product [id] and return [cb]
    {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id); //find product which matches the id
            cb(product);
        })
    }
};