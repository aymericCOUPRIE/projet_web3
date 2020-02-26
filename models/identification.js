var DBInteraction = require('../config/db');
var sql = require('mssql/msnodesqlv8');
var tokenCtrl = require('../config/jwt');
var jwt = require('jsonwebtoken');
const nomToken = 'LOGING_TOKEN';

module.exports = {
    verifUserUnique: function (mail, cb) {
        //var request = new sql.Request(connection);
        DBInteraction.createRequest(res, function (request) {
            request.input('mail', mail);
            request.query("SELECT mailUser FROM Users WHERE mailUser = @mail", function (err, result) {
                if(result.recordset[0] == null) {
                    cb(1);
                } else {
                    cb(0);
                }
            });
        })
    },

    creationToken: function (res, idUser, cb) {
        tokenCtrl.generateTokenForUser(idUser, function (token) {
            cb(res.cookie(nomToken, token, {expire: 3600000 + Date.now()}));
        });
    },

    extractUserFromCookieToken: function (req, cb) {
        if(req.cookies[nomToken]) {
            var token = req.cookies[nomToken];
            var key = tokenCtrl.get_key();
            console.log(key);
            cb(jwt.verify(req.cookies[nomToken], key));
        } else {
            cb(0);
        }
    }
}