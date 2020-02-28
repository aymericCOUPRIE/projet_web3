var connection = require('../config/db');
var sql = require('mssql/msnodesqlv8');
var bcrypt = require('bcrypt');
var idendification = require('../models/identification');

module.exports = {
    loginDisplay: function (req, res) {
        idendification.extractUserFromCookieToken(req, function (data) {
            if(data == 0) {
                res.render('login');
            } else {
                res.redirect('/');
            }
        });
    },

    loginVerif: function (req, res , next) {
        var request = new sql.Request(connection);
        var mail = req.sanitize(req.body.mail);
        var pwd = req.sanitize(req.body.pwd);

        request.input('mail', mail);
        request.query("SELECT * FROM Users Where mailUser = @mail", function (err, resultat) {
            bcrypt.compare(pwd, resultat.recordset[0].passwordUser, function (err, match) {
                idendification.extractUserFromCookieToken(req, function (result) {
                    if(match &&  result == 0 ) {
                        var idUser = resultat.recordset[0].idUser;
                        idendification.creationToken(res, idUser);
                    }
                    next();
                });

            });
        });
    },

    subscribe: function (req, res) {
        res.render('inscription');
    },

    sub: function (req, res) {
        var request = new sql.Request(connection);

        const nom = req.sanitize(req.body.nom);
        const prenom = req.sanitize(req.body.prenom);
        const mail = req.sanitize(req.body.email);
        const dateN = req.sanitize(req.body.dateNaissance);
        const pwd = req.sanitize(req.body.pswd);

        if(nom == null || prenom == null || pwd == null || mail == null) {
            return res.status(400).json({ 'error': 'missing parameters'})
        }

        idendification.verifUserUnique(mail, function(result) {
            if(result) {
                bcrypt.hash(pwd, 5, function (err, bcryptedPassword) {
                    request.input('nom', nom);
                    request.input('prenom', prenom);
                    request.input('mail', mail);
                    request.input('pwd', bcryptedPassword);
                    request.input('dateNaissance', dateN);

                    request.query("INSERT INTO Users (nomUser, prenomUser, mailUser, passwordUser, ageUser) VALUES (@nom, @prenom, @mail, @pwd, @dateNaissance)", function (err) {
                        res.redirect('/');
                    });
                });
            } else {
                res.redirect('/');
            }
        });
    }
}