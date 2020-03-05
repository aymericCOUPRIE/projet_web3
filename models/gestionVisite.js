const connection = require('../config/db');

module.exports = {

    afficherVisit: function(req, cb) {
        connection.query("SELECT * FROM visit WHERE idUser = ?", req, function (err, result) {
            if(err) {
                console.log(err);
            } else {
                cb(result);
            }
        })
    },

    insertVisit: function (req, cb) {
        connection.query("INSERT INTO visit (idUser, idSite, date, avis) VALUES (?, ?, ?, ?)", idUser, idSite, date, avis, function (err, result) {
            if(err) {
                console.log(err);
            } else {
                cb(result);
            }
        })
    },


}