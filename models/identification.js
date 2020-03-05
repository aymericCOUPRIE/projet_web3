var connection = require('../config/db');
var tokenCtrl = require('../config/jwt');
var jwt = require('jsonwebtoken');

const nomToken = 'LOGING_TOKEN';

module.exports = {
    verifUserUnique: function (mail, cb) {
        connection.query("SELECT mailUser FROM Users WHERE mailUser = ?", [mail], function (err, result) {
            if(result[0] == undefined) {
                cb(1);
            } else {
                cb(0);
            }
        });
    },

    creationToken: function (req, infosUser) {
        tokenCtrl.generateTokenForUser(infosUser, function (token) {
            return (req.cookie(nomToken, token, {expire: 3600000 + Date.now()}));
        });
    },

    deleteToken: function(req, res) {
        if(req.cookies[nomToken]) {
            return (res.clearCookie(nomToken));
        }
    },

    extractUserFromCookieToken: function(req, cb) {
        var token = req.cookies[nomToken];
        if (token != null && token != undefined) {
            tokenCtrl.get_key(token, function (nomToken) {
                jwt.verify(token, nomToken, function (err, decoded) {
                    if (decoded != null) {
                        cb(decoded.userId, decoded.droitsUser);
                    } else {
                        cb(0, 0);
                    }
                });
            });
        } else {
            cb(0, 0);
        }
    },

    getUserWithMail: function (mail, cb) {
        connection.query("SELECT * FROM Users WHERE mailUser = ?", [mail], function (err, result) {
            if(err) {
                console.log(err);
            } else if (result == null) {
                cb(null);
            } else {
                cb(result);
            }
        });
    },

    insertUser: function (req, cb) {
        connection.query("INSERT INTO Users (nomUser, prenomUser, mailUser, passwordUser, ageUser, droitsUser) VALUES (?, ?, ?, ?, ?, ?)  ", req, function (err, result) {
            if(err) {
                console.log(err);
            } else {
                cb(result);
            }
        });

    },

    getNomToken: function (req, cb) {
        cb(nomToken);
    }
}