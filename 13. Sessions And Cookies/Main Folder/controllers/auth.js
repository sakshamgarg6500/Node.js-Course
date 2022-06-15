const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    // console.log(req.session.isLoggedIn);
    res.render('./auth/login', {pageTitle :"Login", path : '/login', isAuthenticated: false});
};

exports.postLogin = (req, res, next) => {
    User.findById('609e2f2feeee4426ab4ab476') //obtaining user from the database
        .then(user => {
            //creating [User] object and pasing it to the request
            req.session.user = user;
            req.session.isLoggedIn = true; //we can set values in session like this
            req.session.save(() => { //once we are done saving the session in the database, then only it will redirect
                res.redirect('/');
            });
        })
        .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => res.redirect('/')); //destroys all sessions
}