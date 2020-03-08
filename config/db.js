var mysql = require('mysql');


/*
var connexion = mysql.createPool({
    database: 'nodeJSDb',
    host: 'localhost',
    user: 'root',
    password: ''
});

*/
const connexion = mysql.createPool(process.env.CLEARDB_DATABASE_URL);

connexion.getConnection((err, connect) => {
    if(err)
        console.error("Something went wrong connecting to the database ...");
    if(connect)
        connect.release();
});

module.exports = connexion;