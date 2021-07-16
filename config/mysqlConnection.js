var mysql = require('mysql');

module.exports = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'moerish'
});