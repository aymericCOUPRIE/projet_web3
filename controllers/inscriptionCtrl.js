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
                //mettre un message en disant qu'il est déjà connecté
            }
        });
    },

    loginVerif: function (req, res ) {
        var request = new sql.Request(connection);
        var mail = req.sanitize(req.body.mail);
        var pwd = req.sanitize(req.body.pwd);

        console.log('loginVerif');
        request.input('mail', mail);
        request.query("SELECT * FROM Users Where mailUser = @mail", function (err, resultat) {
            console.log('loginVerif');
            bcrypt.compare(pwd, resultat.recordset[0].passwordUser, function (err, match) {
                console.log("MATCH", match);
                if(match) {
                    var idUser = resultat.recordset[0].idUser;
                    idendification.creationToken(res, idUser, function (result) {
                        console.log("RESULT");
                        res.redirect('/');
                    });
                } else {
                    res.redirect('/');
                }
            });
        });
    },

    subscribe: function (req, res) {
        res.render('inscription');
    },

    sub: async function (req, res) {
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
            console.log('RESULT', result);
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