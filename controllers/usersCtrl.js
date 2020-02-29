var connection = require('../config/db');
var sql = require('mssql/msnodesqlv8');
var identification = require('../models/identification');
var affichageCarriere = require('../models/affichageCarriere');
var url = require('url');


module.exports = {
    accueil: function (req, res) {
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

    choixCarriere: function(req, res) {
        var request = new sql.Request(connection);
        var pathname = url.parse(req.url).pathname;
        pathname = pathname.replace('/', '');

        request.query('SELECT * FROM SitePlongee', function (err, data) {
            request.input('pathname', pathname);
            request.query("SELECT * FROM SitePlongee WHERE nomSitePl = @pathname", function (err, dataInfo) {
                affichageCarriere.getAllImages(dataInfo.recordset[0].idSitePl, function (result) {
                    res.render('index2', {sitesPl: data.recordset, sitesInfos: dataInfo.recordset, images: result.recordset});
                })
            })
        });
    },

    deconnexion: function (req, res, next) {
        identification.deleteToken(req, res);
        next();
    }
}

