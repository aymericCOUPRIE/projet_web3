var mysql = require('mysql');

var connexion = mysql.createConnection({
    database: 'heroku_6eb2a7bfc1b31b2',
    host: 'eu-cdbr-west-02.cleardb.net',
    user: 'bbab736053d516',
    password: '68bd7814'
});

connexion.connect(function (err) {
    if (err)
        throw err;

    console.log("Connexion effectuée");
});

module.exports = connexion;