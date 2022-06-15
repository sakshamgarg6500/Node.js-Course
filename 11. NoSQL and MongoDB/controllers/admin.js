const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => { 
    res.render('./admin/edit_product', {pageTitle : 'Add Product', path : '/admin/add_product', editing :false});
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title; //fetching data using [name] used in input as this is a [post] request
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(null, title, image, price, description, req.user._id);
    product.save()
        .then(()  => res.redirect('/admin/product_list'))
        .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
    .then(products => { 
        res.render('./admin/product_list', {prods :products, pageTitle :"Admin Products", path : '/admin/product_list'});
    })
    .catch(err => console.log(err)); 
};

exports.getEditProduct = (req, res, next) => { 

    const editMode = req.query.edit; //extract [edit] from url 
    //editMode will contain [true] or [false]

    const prodId = req.params.productId; //getting query parameter [productId] from routes and extracting it here

    Product.findById(prodId)
        .then(product => {
            res.render('./admin/edit_product', {pageTitle : 'Edit Product', path : '/admin/edit_product', editing :editMode, product :product}
            );
        })
        .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const id = req.body.pId;
    const title = req.body.title; 
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(id, title, image, price, description);

    product.save()
        .then(() => res.redirect('/admin/product_list'))
        .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res,next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId)
        .then(() => res.redirect('/admin/product_list')) 
        .catch(err => console.log(err));
};