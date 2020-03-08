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

    getPwdUser: function (req, cb) {
        connection.query("SELECT passwordUser FROM users WHERE idUser = ?", [req], function (err, result) {
            if(err) {
                console.log(err)
            } else {
                cb(result);
            }
        })
    },

    updateUserPwd: function (req,id,  cb) {
        connection.query("UPDATE users SET passwordUser = ? WHERE idUser = ? ", [req, id], function (err, result) {
            console.log("MESSAGE", err, result);
            if(err) {
                console.log(err)
            } else {
                cb(result);
            }
        })
    }

};