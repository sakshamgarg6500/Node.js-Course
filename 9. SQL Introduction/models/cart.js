const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '../data', 'cart.json');

module.exports = class Cart { //cart will be created only once and then products will be added and subtracted
    static addProduct(id, productPrice) 
    {
        //Fetch the previous cart
        fs.readFile(p, (err, fileContent) => { //to read file at path [p] and return [err] if error is there or return [fileContent]
            
            let cart = {products :[], totalPrice :0};
            if(!err) //if there is an no error that means a cart is already created 
            {
                cart = JSON.parse(fileContent); //read from the fileContent and store it in [cart]
            }
            
            //Analyse the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id); 
            //search throught the existing products in cart and check if any id matches the product is we are trying to add and find its index
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            
            //Add new product/Increase Quantity
            if(existingProduct) //if we find an existing product
            {
                updatedProduct = {...existingProduct}; //javascript spread operator to copy object
                updatedProduct.qty = updatedProduct.qty + 1; 
                // cart.products = [...cart.products]; //copy the previous cart products
                cart.products[existingProductIndex] = updatedProduct; //replace the existing product with updated product
            }
            else //creating a new product
            {
                updatedProduct = {id :id, qty :1};
                // cart.products = [...cart.products, updatedProduct]; //copying the previous cart products and adding new product
                cart.products.push(updatedProduct);
            }
            cart.totalPrice = cart.totalPrice + +productPrice; //adding total price of cart
            //+ sign with [productPrice] to convert that to a number
            
            fs.writeFile(p, JSON.stringify(cart), (err) => console.log(err)); //writing cart to file
        });
    }

    static deleteProduct(id, productPrice) //we need to update total price of cart too
    {
        fs.readFile(p, (err, fileContent) => {
            if(err) //if the cart is empty and there is no product to delete
                return;

            const updatedCart = {...JSON.parse(fileContent)};
            const product = updatedCart.products.find(prod => prod.id === id);
            if(!product) //if the product is not found in the file
                return;
            const productQty = product.qty; //if the product is present in multiple quantities and then the product is deleted, we need to subtract the total price of the product from the cart
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id); //all the products are kept instead of the product that we deleted using the [filter] function
            updatedCart.totalPrice = updatedCart.totalPrice - (productPrice*productQty);

            fs.writeFile(p, JSON.stringify(updatedCart), (err) => console.log(err));
        });
    }

    static getCart(cb)
    {
        fs.readFile(p, (err, fileContent) =>{
            const cart = JSON.parse(fileContent);
            if(err)
            {
                cb(null);
            }
            else
            {
                cb(cart);
            }
        });
    }
};