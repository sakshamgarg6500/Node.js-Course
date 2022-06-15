const mongodb = require('mongodb');
const databaseConnection = require('../util/database');

class Product
{
    constructor(_id, title, image, price, description, userId)
    {
        this._id = _id ? new mongodb.ObjectId(_id) : null; //if [_id] exists then create its object otherwise null
        this.title = title;
        this.image = image;
        this.price = price;
        this.description = description;
        this.userId = userId;
    }

    save() //a function which can be executed on this class
    //connects to mongoDB and saves our product
    {
        const db = databaseConnection.getDb(); //getting the database connection

        if(this._id) //if product exists, update the product
        {
            return db.collection('products').updateOne({_id: this._id}, {$set: this}); //this method finds the product with the [this_id] and then [$set] updates the key value pairs with the new values //id will not be overrided
        }
        else //else create a new one
        {
            return db.collection('products').insertOne(this); //to tell mongodb with which collection we want to work //if the collection does not exist, it will create it the first time we insert data
        }
    }

    static fetchAll()
    {
        const db = databaseConnection.getDb();
        return db.collection('products')
                .find() //find does not return a promise instead it returns a cursor which helps us go through all our elements
                .toArray() //get all elements and turn them into a javascript array which returns a promise
                .then(products => {
                    return products;
                })
                .catch(err => console.log(err));
    }

    static findById(prodId)
    {
        const db = databaseConnection.getDb();
        return db.collection('products')
                .find({_id: new mongodb.ObjectId(prodId)}) //mongodb creates special ids that are object ids //they cant be simply compared as a string, so we need a costructor provided by mongodb
                .next() //[next] returns the last document that was returned by [find]
                .then(product => {
                    return product;
                })
                .catch(err => console.log(err));
    }

    static deleteById(prodId)
    {
        const db = databaseConnection.getDb();
        return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)})
                .then()
                .catch(err => console.log(err));
    }
}

module.exports = Product;