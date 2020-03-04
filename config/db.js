/*var sql = require("mssql/msnodesqlv8");

var dbConfig = {
    driver: 'msnodesqlv8',
    server: "PCAYMERICDELL", //PCAYMERICDELL ou 169.254.146.24
    database: "NodeJSDb",
    user: "aymeric.couprie@hotmail.com",
    password: 'aze',
    port: 1433,
    options: {
        trustedConnection: true,
        useUTC: true
    }
};

var connection = new sql.ConnectionPool(dbConfig, function (err) {
    if (err) console.log(err);
});

connection.connect();

module.exports = connection;

*/
var mysql = require('mysql');

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

module.exports = connexion;