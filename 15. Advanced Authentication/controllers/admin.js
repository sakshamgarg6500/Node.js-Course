const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => { 
    if(!req.session.isLoggedIn) //if the user is not logged in redirect to login page
        return res.redirect('/login');
    res.render('./admin/edit_product', {pageTitle : 'Add Product', path : '/admin/add_product', editing :false});
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title; //fetching data using [name] used in input as this is a [post] request
    const image = req.body.image;
    const price = req.body.price;
    const author = req.body.author;

    const product = new Product({title: title, image: image, price: price, author: author, user: req.user});
    product.save() //now the save method is defined by mongoose
        .then(()  => res.redirect('/admin/product_list'))
        .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
    Product.find({user: req.user._id}) //[find] method in mongoose returns the products and not a cursor as in case of mongodb's driver
    // .populate('user') //[populate] tells mongoose to populate certain field with all the detailed information and not just the id
    //a [select] method can be added before [populate] to populate specific fields
    .then(products =>  res.render('./admin/product_list', {prods :products, pageTitle :"Admin Products", path : '/admin/product_list'}))
    .catch(err => console.log(err)); 
};

exports.getEditProduct = (req, res, next) => { 

    const editMode = req.query.edit; //extract [edit] from url 
    //editMode will contain [true] or [false]

    const prodId = req.params.productId; //getting query parameter [productId] from routes and extracting it here

    Product.findById(prodId) //here [findById] method is provided by mongoose
        .then(product => res.render('./admin/edit_product', {pageTitle : 'Edit Product', path : '/admin/edit_product', editing :editMode, product :product}))
        .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const id = req.body.pId;
    const title = req.body.title; 
    const image = req.body.image;
    const price = req.body.price;
    const author = req.body.author;

    Product.findById(id)
        .then(product => { //we will retrieve the existing product 
            if(product.user.toString() !== req.user._id.toString()) //to check if the user who created this product is trying to edit the product
                return res.redirect('/'); //if not the same user then redirect
            product.title = title;
            product.image = image;
            product.price = price;
            product.author = author;

            return product.save()
                        .then(() => res.redirect('/admin/product_list'))
                        .catch(err => console.log(err)); //[save] method will update the properties mentioned above behind the scenes
        })
        .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res,next) => {
    const prodId = req.body.productId;
    Product.deleteOne({_id: prodId, user: req.user._id})
        .then(() => res.redirect('/admin/product_list')) 
        .catch(err => console.log(err));
};