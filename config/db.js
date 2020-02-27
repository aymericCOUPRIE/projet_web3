var sql = require("mssql/msnodesqlv8");

var dbConfig = {
    driver: 'msnodesqlv8',
    server: "PCAYMERICDELL", //PCAYMERICDELL ou 169.254.146.24
    database: "NodeJSDb",
    user: "test",
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

