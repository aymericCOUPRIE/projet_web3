var identification = require('../models/identification');
var gestionCarriere = require('../models/gestionCarriere');
var gestionMaps = require('../models/gestionMaps');


module.exports = {
    accueil: function (req, res) {
        identification.extractUserFromCookieToken(req, function (id, droits) {
            gestionCarriere.getAllNoms(req, function (nomSites) {
                res.render('index', {sitesPl: nomSites.recordset, isConnected: id, droits: droits });
            });
        });
    },

    mapsDisplay: function (req, res) {
        gestionMaps.getAllCoords(req, function(coords) {
            gestionCarriere.getAllNoms(req, function (nomSites) {
                identification.extractUserFromCookieToken(req, function (id, droits) {
                    res.render('maps', {
                        coords: coords.recordset,
                        sitesPl: nomSites.recordset,
                        isConnected: id,
                        droits: droits
                    });
                });
            });
        });
    },

    planningDisplay: function(req, res) {
        res.render('planning');
    },

    deconnexion: async function (req, res, next) {
        await identification.deleteToken(req, res);
        next();
    },

    deleteCarriere: function (req, res, next) {
        gestionCarriere.deleteCarriere(req.body.test, function (infos) {
            next();
        });
    }
}

