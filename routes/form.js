'use strict';
var express = require('express');
var router = express.Router();
var sql = require('mssql/msnodesqlv8');
var connection = require('../config/db');

router.get('/', function (req, res) {
    res.render('form', { title: 'Express' });
});


router.post('/', function (req, res) {
    var request = new sql.Request(connection);

    const mail = req.body.mail;
    request.input('mail', mail);
    request.query("INSERT INTO Users (mailUser) VALUES (@mail)", function (err) {
        if(err) {
            console.log(err);
        }
        connection.close();
    });

    res.render('form', { title: mail });
});

module.exports = router;

