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

    getAllVisitUser: function (req, cb) {
        connection.query("SELECT * FROM visite INNER JOIN sitePlongee ON idSitePl = idSite WHERE idUser = ? ORDER BY date ", req, function (err, result) {
            if(err) {
                console.log(err)
            } else {
                cb(result);
            }
        });
    },

    deleteProfil: function (req, cb) {
        connection.query("DELETE FROM users WHERE idUser = ?", [req], function (err, result) {
            if(err) {
                console.log(err);
            } else {
                cb(result);
            }
        });
    },


    updateUser: function (req, cb) {
        connection.query("UPDATE users SET nomUser = ?, prenomUser = ?, mailUser = ?, ageUser = ? WHERE idUser = ?", req, function (err, result) {
            if(err) {
                console.log(err);
            } else {
                cb(result);
            }
        });
    },

    deleteCertif: function (req, cb) {
        connection.query("DELETE FROM certifusers WHERE idCertif = (SELECT idCertif FROM certifications WHERE labelNiv = ? ) AND idUser = ?", req, function (err, result) {
            if(err) {
                console.log(err)
            } else {
                cb(result);
            }
        })
    },


    insertCertif: function(req, cb) {
        connection.query("INSERT INTO certifusers (idUser, idCertif) VALUES (?, (SELECT idCertif FROM certifications WHERE labelNiv = ?))", req, function (err, result) {
            if(err) {
                console.log(err)
            } else {
                cb(result);
            }
        })
    },

};