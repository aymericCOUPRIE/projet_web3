var connection = require('../config/db');
//var sql = require('mssql/msnodesqlv8');
var tokenCtrl = require('../config/jwt');
var jwt = require('jsonwebtoken');

const nomToken = 'LOGING_TOKEN';

module.exports = {
    verifUserUnique: function (mail, cb) {
        var request = new sql.Request(connection);
        request.input('mail', mail);
        request.query("SELECT mailUser FROM Users WHERE mailUser = @mail", function (err, result) {
            if(result.recordset[0] == null) {
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

    getUserWithMail: function (req, cb) {
        var request = new sql.Request(connection);
        request.input('mail', req);
        request.query("SELECT * FROM Users WHERE mailUser = @mail", function (err, result) {
            if(err) {
                console.log(err);
            } else if (result.recordset[0] == null) {
                cb(null);
            } else {
                cb(result);
            }
        });
    },

    insertUser: function (req, cb) {
        var request = new sql.Request(connection);

        request.input('nom', req[0]);
        request.input('prenom', req[1]);
        request.input('mail', req[2]);
        request.input('dateNaissance', req[3]);
        request.input('pwd', req[4]);

        request.query("INSERT INTO Users (nomUser, prenomUser, mailUser, passwordUser, ageUser, droitsUser) VALUES (@nom, @prenom, @mail, @pwd, @dateNaissance, 1)", function (err, result) {
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