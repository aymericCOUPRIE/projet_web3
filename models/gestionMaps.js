var connection = require('../config/db');

module.exports = {

    getAllCoords: function(req, cb) {
        connection.query("SELECT latitude, longitude FROM SitePlongee", function (err, result) {
            if(err) {
                console.log(err);
            } else {
                cb(result);
            }
        })

    }
}