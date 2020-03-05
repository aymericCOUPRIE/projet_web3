const connection = require('../config/db');

module.exports = {
    getAllInfosUsers: function (req, cb) {
        connection.query("SELECT * FROM User WHERE idUser = ?", req, function (err, result) {
            cb(result[0]);
        });
    },

}