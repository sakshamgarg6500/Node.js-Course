const db = require('../util/database');

const Cart = require('./cart');
  
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
        return db.execute('INSERT INTO products (title, price, image, description) VALUES (?,?,?,?)',
        [this.title,this.price,this.image,this.description]);
    }
  
    static fetchAll() 
    {
        return db.execute('SELECT * FROM products'); //[products] is the name of the table
    }

    static deleteById(id)
    {

    }

    static findById(id) 
    {
        return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
    }
};