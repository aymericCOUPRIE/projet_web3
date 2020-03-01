var connection = require('../config/db');
var sql = require('mssql/msnodesqlv8');
var identification = require('../models/identification');
var affichageCarriere = require('../models/affichageCarriere');
var url = require('url');


module.exports = {
    accueil: function (req, res) {
        console.log("TEST");
        identification.extractUserFromCookieToken(req, function (result) {
            var request = new sql.Request(connection);
            request.query('SELECT nomSitePl FROM SitePlongee', function (err, data) {
                res.render('index', {sitesPl: data.recordset, isConnected: result});
            });
        });
    },

    mapsDisplay: function (req, res) {
        res.render('maps');
    },

    planningDisplay: function(req, res) {
        res.render('planning');
    },

    selection: function (req, res) {
        var request = new sql.Request(connection);
        request.query('SELECT * FROM SitePlongee', function (err, data) {
            res.render('index', {sitesPl: data.recordset});
        });
    },

    deconnexion: function (req, res, next) {
        identification.deleteToken(req, res);
        next();
    }
}

