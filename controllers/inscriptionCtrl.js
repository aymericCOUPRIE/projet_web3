var bcrypt = require('bcrypt');
var idendification = require('../models/identification');

module.exports = {
    loginDisplay: function (req, res, next) {
        idendification.extractUserFromCookieToken(req, function (id, droits) {
            if(id == 0) {
                res.render('pages/login/login', {isConnected: id, droits: droits});
            } else {
                res.redirect('/');
            }
        });
    },

    loginVerif: function (req, res) {
        var mail = req.sanitize(req.body.mail);
        var pwd = req.sanitize(req.body.pwd);

        idendification.getUserWithMail(mail, function(infosUsers) {
            bcrypt.compare(pwd, infosUsers.passwordUser, function (err, match) {
                idendification.extractUserFromCookieToken(req, function (result) {
                    if(match && result == 0) {
                        idendification.creationToken(res, infosUsers);
                        res.redirect('/');
                    } else {
                        res.redirect('/login');
                    }

                });
            });
        });
    },

    subscribe: function (req, res) {
        idendification.extractUserFromCookieToken(req, function (id, droits) {
            res.render('pages/login/inscription', {isConnected: id, droits: droits});
        });
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