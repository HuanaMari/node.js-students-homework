var mysql = require('mysql');
require('dotenv/config');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'Kuzmanoska',
    password: 'Banamilolo1',
    database: 'code_academy'
});

connection.connect((error) => {
    if(error){
        console.log("problem with DB connection " + error.message)
    }else{
        console.log("DB conected!")
    }
});

module.exports = connection;