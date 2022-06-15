const mysql = require('mysql2'); //importing [mysql] package

const pool = mysql.createPool({ //creating a pool of connections instead of a single connection
    host: 'localhost',
    user: 'root',
    database: 'node_complete', //name of database
    password: 'Hellcat@007'
});

module.exports = pool.promise(); //promises help us to write code in a more structured way