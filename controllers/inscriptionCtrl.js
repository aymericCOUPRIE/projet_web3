var bcrypt = require('bcrypt');
var idendification = require('../models/identification');

module.exports = {
    loginDisplay: function (req, res, next) {
        idendification.extractUserFromCookieToken(req, function (data) {
            if(data == 0) {
                res.render('login');
            } else {
                next();
            }
        });
    },

    loginVerif: function (req, res , next) {
        var mail = req.sanitize(req.body.mail);
        var pwd = req.sanitize(req.body.pwd);

        idendification.getUserWithMail(mail, function(infosUsers) {
            bcrypt.compare(pwd, infosUsers.recordset[0].passwordUser, function (err, match) {
                idendification.extractUserFromCookieToken(req, function (result) {
                    if(match && result == 0) {
                        //var idUser = infosUsers.recordset[0].idUser;
                        idendification.creationToken(res, infosUsers);
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
                    var user = [nom, prenom, mail, dateN, bcryptedPassword];
                    idendification.insertUser(user, function (idInsert) {
                        res.redirect('/');
                    });
                });
            } else {
                res.redirect('/');
            }
        });
    }
}