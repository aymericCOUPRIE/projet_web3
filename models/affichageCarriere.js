var connection = require('../config/db');
var sql = require('mssql/msnodesqlv8');

module.exports = {
    getAllImages: function (req, cb) {
        var request = new sql.Request(connection);
        request.input('idCarriere', req);
        console.log(req);
        request.query("SELECT * FROM Images WHERE idSitePl = @idCarriere", function (err, result) {
            console.log(result);
            if(err) {
                console.log(err)
            } else {
                cb(result);
            }
        });
    },
}