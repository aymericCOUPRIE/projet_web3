'use strict';
var express = require('express');
var router = express.Router();
var sql = require('mssql/msnodesqlv8');
var connection = require('../config/db');

router.get('/', function (req, res, next) {
    res.render('login', { title: 'Express' });
});


router.post('/', function (req, res) {

    var request = new sql.Request(connection);

    const nom = req.body.nom;
    request.input('nom', nom);
    request.input('prenom', req.body.prenom);
    request.input('mail', req.body.mail);
    request.input('pwd', req.body.pwd);
    request.input('age', req.body.ageU);
    request.query("INSERT INTO Users (nomUser, prenomUser, mailUser, passwordUser, ageUser) VALUES (@nom, @prenom, @mail, @pwd, @age)", function (err, recordset) {
        if (err) {
            console.log(err);
        }
        connection.close();
    });

    res.render('login', {title :'Aymeric'});
});

module.exports = router;

