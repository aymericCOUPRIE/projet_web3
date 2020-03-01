var connection = require('../config/db');
var sql = require('mssql/msnodesqlv8');
var identification = require('../models/identification');
var affichageCarriere = require('../models/affichageCarriere');
var gestionMaps = require('../models/gestionMaps');
var url = require('url');


module.exports = {
    accueil: function (req, res) {
        identification.extractUserFromCookieToken(req, function (result) {
            console.log(result);
            var request = new sql.Request(connection);
            request.query('SELECT nomSitePl FROM SitePlongee', function (err, data) {
                res.render('index', {sitesPl: data.recordset, isConnected: result});
            });
        });
    },

    mapsDisplay: function (req, res) {
        gestionMaps.getAllCoordonates(req, function(result) {
            console.log(result);
            res.render('maps', {coords: result.recordset});
        });
    },

    planningDisplay: function(req, res) {
        res.render('planning');
    },

    deconnexion: async function (req, res, next) {
        await identification.deleteToken(req, res);
        next();
    }
}

