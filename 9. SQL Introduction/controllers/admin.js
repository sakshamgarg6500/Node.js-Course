const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => { 
    res.render('./admin/edit_product', {pageTitle : 'Add Product', path : '/admin/add_product', editing :false});
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title; //fetching data using [name] used in input as this is a [post] request
    const image = req.body.image;
    const description = req.body.description;
    const price = req.body.price;

    const product = new Product(null,title,image,description,price); //creating object of the class
    product.save()
        .then(() => res.redirect('/'))
        .catch(err => console.log(err)); //calling the function of the class
};

exports.getEditProduct = (req, res, next) => { 

    const editMode = req.query.edit; //extract [edit] from url 
    //editMode will contain [true] or [false]

    const prodId = req.params.productId; //getting query parameter [productId] from routes and extracting it here

    Product.findById(prodId, product => {
        res.render('./admin/edit_product', {pageTitle : 'Edit Product', path : '/admin/edit_product', editing :editMode, product :product});
    });
};

exports.postEditProduct = (req, res, next) => {
    const id = req.body.pId;
    const title = req.body.title; 
    const image = req.body.image;
    const description = req.body.description;
    const price = req.body.price;

    const updatedProduct = new Product(id, title, image, description, price);
    updatedProduct.save();

    res.redirect('/admin/product_list');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => { //we get data of products in [products] from file
        res.render('./admin/product_list', {prods :products, pageTitle :"Admin Products", path : '/admin/product_list'}); 
    });
};

exports.postDeleteProduct = (req, res,next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/product_list');
};