var mysql = require('mysql');

var connexion = mysql.createConnection({
    database: 'heroku_6eb2a7bfc1b31b2',
    host: 'eu-cdbr-west-02.cleardb.net',
    user: 'bbab736053d516',
    password: '68bd7814'
});

connection.getConnection((err, connect) => {
    if(err)
        console.error("Something went wrong connecting to the database ...");
    if(connect)
        connect.release();
});

module.exports = connexion;