var bcrypt = require('bcrypt');
var connection = require('../config/db');
var sql = require('mssql/msnodesqlv8');
var bcrypt = require('bcrypt');
var jwt = require('../config/jwt');
var Cookies = require('cookie-parser');


module.exports = {
    loginDisplay: function (req, res) {
        res.render('login');
    },

    loginVerif: function (req, res ) {
        var  request = new sql.Request(connection);
        var mail = req.body.mail;
        var pwd = req.body.pwd;

        request.input('mail', mail);
        request.query("SELECT * FROM Users Where mailUser = @mail", function (err, resultat) {
            console.log(resultat.recordset[0].passwordUser);

            bcrypt.compare(pwd, resultat.recordset[0].passwordUser, function (err, match) {
                if(match) {
                    console.log("Authentification vérifiée");
                    var token = jwt.generateTokenForUser(resultat.recordset[0]);
                    return res.cookie('Aymeric', token, {expire: 3600000 + Date.now()}).redirect('/');
                } else {
                    console.log('Athentification refusée');
                }
                if(err) {
                    console.log(err);
                }
            });
            if(err) {
                console.log(err);
            }
        });
    },

    subscribe: function (req, res) {
        res.render('inscription');
    },

    sub: function (req, res) {

        var request = new sql.Request(connection);

        var nom = req.body.nom;
        var prenom = req.body.prenom;
        var mail = req.body.mail;
        var age = req.body.ageU;
        var pwd = req.body.pswd;

        if(nom == null || prenom == null || pwd == null || mail == null) {
            return res.status(400).json({ 'error': 'missing parameters'})
        }

        bcrypt.hash(pwd, 5, function (err, bcryptedPassword) {
            request.input('nom', nom);
            request.input('prenom', prenom);
            request.input('mail', mail);
            request.input('pwd', bcryptedPassword);
            request.input('age', age);
            request.query("INSERT INTO Users (nomUser, prenomUser, mailUser, passwordUser, ageUser) VALUES (@nom, @prenom, @mail, @pwd, @age)", function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });
        res.redirect('/');
    }
}