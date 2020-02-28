var connection = require('../config/db');
var sql = require('mssql/msnodesqlv8');
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

    creationToken: function (req, idUser) {
        tokenCtrl.generateTokenForUser(idUser, function (token) {
            req.cookie(nomToken, token, {expire: 3600000 + Date.now()});
        });
    },

    deleteToken: function(req, res) {
        console.log('TEST', req.cookies[nomToken]);
        if(req.cookies[nomToken]) {
            console.log('TEST2', req.cookies[nomToken]);
            res.clearCookie(nomToken);
        }
    },

    extractUserFromCookieToken: function(req, cb) {
        var token = req.cookies[nomToken];
        if (token != null && token != undefined) {
            tokenCtrl.get_key(token, function (nomToken) {
                jwt.verify(token, nomToken, function (err, decoded) {
                    if (decoded != null) {
                        cb(decoded.userId);
                    } else {
                        cb(0);
                    }
                });
            });
        } else {
            cb(0);
        }
    }
}