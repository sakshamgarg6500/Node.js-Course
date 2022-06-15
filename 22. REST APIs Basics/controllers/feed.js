const {validationResult} = require('express-validator/check');
const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
    Post.find()
        .then(posts => {
            res.status(200).json({message: 'Fetched posts successfully', posts: posts});
        })
        .catch(err => {
            if(!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
    //[json] is a method provided by express.js that allows to return a response with json data 
    //we pass a normal javascript object to this method and then it is converted into json format and sent back as response to the client
};

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        const error = new Error('Validation failed, entered data is incorrect');
        error.statusCode = 422;
        throw error; //this will terminate the execution of the function and go to the next error handling function as this is asynchronous code
    }

    const title = req.body.title;
    const content = req.body.content;

    //create post in database
    const post = new Post({
        title: title,
        content: content,
        imageUrl: 'images/obj.jpg',
        creator: {name: 'Saksham'}
    });

    post.save()
        .then(result => {
            res.status(201).json({
                message: 'Post created Successfully',
                post: result
            });
        })
        .catch(err => {
            if(!err.statusCode) //[err.statusCode] will not be there
                err.statusCode = 500;
            next(err); //as this is asynchronous code, throwing an error will not work
        })
};

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
        .then(post => {
            if(!post)
            {
                const error = new Error('Could not find post');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({message: 'Post fetched', post: post});
        })
        .catch(err => {
            if(!err.statusCode)
                err.statusCode = 500;
            next(err);
        });
};