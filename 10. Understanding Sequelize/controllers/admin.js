const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => { 
    res.render('./admin/edit_product', {pageTitle : 'Add Product', path : '/admin/add_product', editing :false});
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title; //fetching data using [name] used in input as this is a [post] request
    const image = req.body.image;
    const description = req.body.description;
    const price = req.body.price;

    req.user.createProduct({ //this function is provided by sequelize after we define relations in app.js file
        title: title,
        price: price,
        image: image,
        description: description
    })
    .then(result  => res.redirect('/'))
    .catch(err => {
        console.log(err);
    });;
};

exports.getEditProduct = (req, res, next) => { 

    const editMode = req.query.edit; //extract [edit] from url 
    //editMode will contain [true] or [false]

    const prodId = req.params.productId; //getting query parameter [productId] from routes and extracting it here

    req.user.getProducts({where: {id: prodId}}) //[getProducts] gives us all products for this user
        .then(products => {
            const product = products[0]; //we get back an array which hold one element
            res.render('./admin/edit_product', {pageTitle : 'Edit Product', path : '/admin/edit_product', editing :editMode, product :product}
            )})
        .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const id = req.body.pId;
    const title = req.body.title; 
    const image = req.body.image;
    const description = req.body.description;
    const price = req.body.price;

    Product.findByPk(id)
        .then(product => {
            product.title = title;
            product.image = image;
            product.description = description;
            product.price = price;
        
            return product.save(); //method offered by sequelize, it saves our edited product to database
        })
        .then(result => res.redirect('/admin/product_list'))
        .catch(err => console.log(err));

};

exports.getProducts = (req, res, next) => {
        req.user.getProducts()
        .then(products => { 
            res.render('./admin/product_list', {prods :products, pageTitle :"Admin Products", path : '/admin/product_list'});
        })
        .catch(err => console.log(err)); 
};

exports.postDeleteProduct = (req, res,next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId)
        .then(product => {return product.destroy();})
        .then(result => res.redirect('/admin/product_list')) //it receives promises from above [then] block
        .catch(err => console.log(err));
};