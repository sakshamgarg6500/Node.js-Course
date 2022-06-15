const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => { 
    res.render('./admin/add_product', {pageTitle : 'Add Product', path : '/admin/add-product'});
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const image = req.body.image;
    const description = req.body.description;
    const price = req.body.price;

    const product = new Product(title,image,description,price); 
    product.save(); 
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('./admin/product_list', {prods :products, pageTitle :"Admin Products", path : '/admin/product_list'}); 
    });
};