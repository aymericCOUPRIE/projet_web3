var identification = require('../models/identification');
var affichageCarriere = require('../models/affichageCarriere');
var gestionMaps = require('../models/gestionMaps');

module.exports = {
    accueil: function (req, res) {
        identification.extractUserFromCookieToken(req, function (result) {
            affichageCarriere.getAllNoms(req, function (nomSites) {
                res.render('index', {sitesPl: nomSites.recordset, isConnected: result});
            });
        });
    },

    mapsDisplay: function (req, res) {
        gestionMaps.getAllCoords(req, function(coords) {
            affichageCarriere.getAllNoms(req, function (nomSites) {
                res.render('maps', {coords: coords.recordset, sitesPl: nomSites.recordset});
            })
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

