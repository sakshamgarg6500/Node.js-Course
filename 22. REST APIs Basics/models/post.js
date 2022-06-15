const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    imageUrl: String,
    content: String,
    creator: Object
},{timestamps: true});

module.exports = mongoose.model('post', postSchema);