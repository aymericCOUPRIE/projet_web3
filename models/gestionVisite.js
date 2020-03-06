const connection = require('../config/db');

module.exports = {

    afficherVisit: function(req, cb) {
        connection.query("SELECT * FROM visit WHERE idUser = ?", [req], function (err, result) {
            if(err) {
                console.log(err);
            } else {
                cb(result);
            }
        })
    },

    insertVisit: function (idUser, nomCarriere, cb) {
        var date = new Date();
        date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
        console.log("INSERTION", date);
        connection.query("INSERT INTO visite (idUser, idSite, visite.date) VALUES (?, (SELECT idSitePl FROM siteplongee WHERE nomSitePl = ?), ?)", [idUser, nomCarriere, date] , function (err, result) {
            console.log("ERR", err, "RESULT", result);
            if(err) {
                console.log(err);
            } else {
                cb(result);
            }
        })
    },

    updateVisite: function (req, cb) {
        connection.query("UPDATE visite SET avis = ? WHERE idUser = ? AND idSite = ? AND date = ?", req, function (err, result) {
            if(err) {
                console.log(err);
            } else {
                cb(result);
            }
        })
    }


};