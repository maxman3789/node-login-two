const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'nodes-login',
    user: 'root',
    password: '',
    port: 3305
});

connection.connect(function(error){
    if(error)
    {
        throw error;
    }
    else
    {
        console.log('MySQL Database is connected');
    }
});

module.exports = connection;