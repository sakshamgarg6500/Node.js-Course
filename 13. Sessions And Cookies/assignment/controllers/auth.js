const User = require('../models/user'); //importing the user model

exports.getLogin = (req, res, next) => {
    // console.log(req.session.isLoggedIn);
    res.render('./auth/login', {pageTitle :"Login", path : '/login', isAuthenticated: false});
};

exports.postLogin = (req, res, next) => {
    // req.session.isLoggedIn = true; //we can set values in session like this
    User.findOne() //returns the first document that it finds
                .then(user => {
                    if(!user) //if user does not exist
                    {
                        const user = new User({
                            name: 'Saksham',
                            email: 'saksham@gamil.com',
                            cart: {
                                items: []
                            }
                        });
                        user.save();
                    }
                });
    User.findById('6097d2b8fa11d02384f03455') //obtaining user from the database
    .then(user => {
        //creating [User] object and pasing it to the request
        req.session.user = user;
        req.session.isLoggedIn=true;
    })
    .catch(err => console.log(err));
    res.redirect('/');
};