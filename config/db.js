var mysql = require('mysql');

/*
var connexion = mysql.createConnection({
    database: 'nodeJSDb',
    host: 'localhost',
    user: 'root',
    password: ''
});

connexion.connect(function (err) {
    if (err)
        throw err;

    console.log("Connexion effectuée");
});
*/



var connexion = mysql.createPool({
    database: 'heroku_6eb2a7bfc1b31b2',
    host: 'eu-cdbr-west-02.cleardb.net',
    user: 'bbab736053d516',
    password: '68bd7814'
});


connexion.getConnection((err, connect) => {
    if(err)
        console.error("Something went wrong connecting to the database ...");
    if(connect)
        connect.release();
});

module.exports = connexion;