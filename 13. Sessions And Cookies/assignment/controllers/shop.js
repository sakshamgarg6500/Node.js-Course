const Product = require('../models/product');
const Order = require('../models/order');

//FOR SHOP [Home Page]
exports.getIndex = (req, res, next) => {
    Product.find() 
            .then(products => res.render('./shop/index', {prods :products, pageTitle :"Shop", path : '/', isAuthenticated: req.session.isLoggedIn}))
            .catch(err => console.log(err)); 
};

//FOR PRODUCTS
exports.getProducts = (req, res, next) => {
    Product.find()
            .then(products => res.render('./shop/product_list', {prods :products, pageTitle :"All Products", path : '/products', isAuthenticated: req.session.isLoggedIn}))
            .catch(err => console.log(err)); 
};

//FOR DETAILS OF A PRODUCT
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId) //here [findById] method is provided by mongoose
            .then(product => res.render('shop/product_detail', {product: product, pageTitle: product.title, path: '/products', isAuthenticated: req.session.isLoggedIn}))
            .catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
    req.session.user.populate('cart.items.productId') //[populate] function to fetch data at [cart.items.productId]
            .execPopulate() //to get a promise
            .then(user => res.render('./shop/cart', {pageTitle :"Your Cart", path : '/cart', products :user.cart.items, isAuthenticated: req.session.isLoggedIn}))
            .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
            .then(product => {
                return req.session.user.addToCart(product);
            })
            .then(() => res.redirect('/cart'))
            .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.session.user.removeFromCart(prodId) //we need an additonal method and not [findByIdAndRemove] because we are not deleting the entire user but modifying the document
            .then(() => res.redirect('/cart'))
            .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
    req.session.user.populate('cart.items.productId')
            .execPopulate()
            .then(user => {
                const products = user.cart.items.map(i => {
                    return {product: {...i.productId._doc}, quantity: i.quantity};
                });
                const order = new Order({
                    products: products,
                    user: {
                        name: req.session.user.name,
                        userId: req.session.user._id
                    }
                }); 
                req.session.user.clearCart();
                return order.save();
            })
            .then(() => res.redirect('/orders'))
            .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
    Order.find({'user.userId': req.session.user._id})
        .then(orders => res.render('./shop/orders', {pageTitle :"Your Orders", path : '/orders', orders: orders, isAuthenticated: req.session.isLoggedIn}))
        .catch(err => console.log(err));
};