const connection = require('../config/db');

module.exports = {
    getAllInfosUsers: function (req, cb) {
        connection.query("SELECT nomUser, prenomUser, mailUser, ageUser FROM Users WHERE idUser = ?", req, function (err, result) {
            if(err) {
                console.log(err)
            } else {
                cb(result[0]);
            }
        });
    },

    getAllUserCertification: function (req, cb) {
        connection.query("SELECT * FROM certifusers WHERE idUser = ?", req, function (err, result) {
            if(err) {
                console.log(err);
            } else {
                cb(result);
            }
        });
    },

};