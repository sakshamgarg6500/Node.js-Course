const mongodb = require('mongodb'); //npm install --save mongodb //gives us access to mongodb package
const MongoClient = mongodb.MongoClient; //importing MongoClient constructor

let _db; //[_] signifies that this variable is to be used only inside this file locally

const mongoConnect = callback => { //method for connecting to the database
    MongoClient.connect('mongodb+srv://Saksham:Hellcat@007@cluster0.0ty6a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(client => {
        console.log('Connected');
        _db = client.db(); //storing the connection
        callback();
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

const getDb = () => { //method for returning the connection to the connected database
    if(_db)
        return _db;
    else    
        throw 'No DataBase found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;