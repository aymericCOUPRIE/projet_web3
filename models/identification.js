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

    creationToken: function (req, idUser, cb) {
        tokenCtrl.generateTokenForUser(idUser, function (token) {
            cb(req.cookie(nomToken, token, {expire: 3600000 + Date.now()}));
        });
    },

    extractUserFromCookieToken: function(req, cb) {
        var token = req.cookies[nomToken];
        if (token != null) {
            tokenCtrl.get_key(token, function (result) {
                jwt.verify(token, result, function (decoded) {
                    if (decoded == undefined) {
                        cb(decoded);
                    } else {
                        cb(0);
                    }
                });
            });
        }
    }
}