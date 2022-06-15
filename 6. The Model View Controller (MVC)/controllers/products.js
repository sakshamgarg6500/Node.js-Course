const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => { 
    res.render('add_product', {pageTitle : 'Add Product', path : '/admin/add-product'});
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title); //creating object of the class
    product.save(); //calling the function of the class
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => { //fetchAll executes this function once it is done
        res.render('shop', {prods :products, pageTitle :"Shop", path : '/'}); 
    });
};