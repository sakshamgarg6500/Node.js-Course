const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if(message.length>0)
        message = message[0]; //array is received when passing message throigh flash
    else    
        message = null;
    res.render('./auth/signup',{pageTitle :"Signup", path : '/signup', isAuthenticated: false, errorMessage: message});
};

exports.postSignup = (req, res, next) => {
    //fetch data from the input fields
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    //see that no user exists with the same email
    User.findOne({email: email})
        .then(userData => {
            if(userData) //if user with same email is found
            {
                req.flash('error', 'Email already registered');
                return res.redirect('/signup');
            }
            
            return bcrypt.hash(password, 12)
                        .then(hashedPassword => {
                            const user = new User({ //if user is not found, create new user
                                email: email,
                                password: hashedPassword,
                                cart: {items: []}
                            });
                
                            user.save();
                        })
                        .then(() => {
                            res.redirect('/login');
                        }); //once the user has signed up, redirect to login //the second argument tells the number of times hashing will be done
        })
        .catch(err => console.log(err));
};

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if(message.length>0)
        message = message[0];
    else    
        message = null;
    res.render('./auth/login', {pageTitle :"Login", path : '/login', isAuthenticated: false, errorMessage: message});
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email}) //obtaining user from the database
        .then(user => {
            if(!user) //if the user is not found in the database
            {
                req.flash('error', 'Invalid Email or Password');
                return res.redirect('/login');
            }
            
            bcrypt.compare(password, user.password)
                .then(doMatch => { //boolean value will be returned by the [compare] function; [true] if passwords match and [false] if they donot
                    if(doMatch)
                    {
                        //creating [User] object and pasing it to the request
                        req.session.user = user;
                        req.session.isLoggedIn = true; //we can set values in session like this
                        return req.session.save(() => { //once we are done saving the session in the database, then only it will redirect
                            res.redirect('/');
                        });
                    }
                    req.flash('error', 'Invalid Email or Password');
                    res.redirect('/login'); //if the passwords do not match
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                });
        })
        .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => res.redirect('/')); //destroys all sessions
};