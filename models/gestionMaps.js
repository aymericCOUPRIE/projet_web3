var connection = require('../config/db');
//var sql = require('mssql/msnodesqlv8');

module.exports = {

    getAllCoords: function(req, cb) {
        //var request = new sql.Request(connection);
        //request.query("SELECT latitude, longitude FROM SitePlongee", function (err, result) {
        connection.query("SELECT latitude, longitude FROM SitePlongee", function (err, result) {
            if(err) {
                console.log(err);
            } else {
                cb(result);
            }
        })

    }
}