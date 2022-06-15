const databaseConnection = require('../util/database');
const mongodb = require('mongodb');

class User 
{
    constructor(username, email, cart, _id)
    {
        this.name = username;
        this.email = email;
        this.cart = cart; //{items: []}
        this._id = _id;
    }

    save()
    {
        const db = databaseConnection.getDb();
        db.collection('users').insertone(this);
    }

    static findById(userId)
    {
        const db = databaseConnection.getDb(); //getting connection from the database
        return db.collection('users')
                .find({_id: new mongodb.ObjectId(userId)})
                .next() //[next] returns the last document that was returned by [find]
                .then(user => {
                    return user;
                })
                .catch(err => console.log(err));
    }

    addToCart(product)
    {
        const cartProductIndex = this.cart.items.findIndex(cp =>{ //finding index if already product exists
            return cp.productId.toString() === product._id.toString();
        });
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];

        if(cartProductIndex >= 0) //if products's index is found, it will be greatre than or equal to 0
        {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        }
        else
        {
            updatedCartItems.push({productId: new mongodb.ObjectId(product._id), quantity: newQuantity});
        }

        const updatedCart = {
            items: updatedCartItems
        };

        const db = databaseConnection.getDb();
        return db.collection('users')
                .updateOne({_id: new mongodb.ObjectId(this._id)}, {$set :{cart: updatedCart}});
    }

    getCart()
    {
        const db = databaseConnection.getDb();
        const productIds = this.cart.items.map(i => {return i.productId;}); //get all the [productId] that are there in the cart
        return db.collection('products')
                .find({_id: {$in: productIds}}) //return all the products whose [productId] are there in the previous array
                .toArray()
                .then(products => {
                    return products.map(p => {
                        return {...p, quantity: this.cart.items.find(i => {return i.productId.toString() === p._id.toString();}).quantity};
                    });
                })
                .catch(err => console.log(err)); 
    }

    deleteItemFromCart(productId)
    {
        const updatedCartItems = this.cart.items.filter(item => { //filter method will return a new array for all the [items] that pass the condition
            return item.productId.toString() !== productId.toString();
        });

        const db = databaseConnection.getDb();
        return db.collection('users')
                .updateOne({_id: new mongodb.ObjectId(this._id)}, {$set :{cart: {items: updatedCartItems}}});
    }

    addOrder()
    {
        const db = databaseConnection.getDb();
        return this.getCart().then(products => { //[getCart] method returns an array
            const order = {
                user:   {
                            _id: new mongodb.ObjectId(this._id),
                            name: this.name
                        },
                items: products //[products] are stored as an array under [items]
            };

            return db.collection('orders')
                    .insertOne(order)
                    .then(() => {
                        this.cart = {items: []}; //updating cart in the [user] object
                        db.collection('users').updateOne({_id: new mongodb.ObjectId(this._id)}, {$set :{cart: {items: []}}}); //updating cart in database
                    })
                    .catch(err => console.log(err))
        });
    }

    getOrders()
    {
        const db = databaseConnection.getDb();
        return db.collection('orders')
                .find({'user._id': new mongodb.ObjectId(this._id)}) //return all orders of [this] user's _id
                .toArray();
    }
}

module.exports = User;