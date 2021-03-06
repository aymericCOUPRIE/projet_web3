var identification = require('../models/identification');
var gestionCarriere = require('../models/gestionCarriere');
var gestionMaps = require('../models/gestionMaps');

module.exports = {
    accueil: function (req, res) {
        identification.extractUserFromCookieToken(req, function (id, droits) {
            gestionCarriere.getAllNomsAndDesc(req, function (infosSites) {
                res.render('pages/accueil', {sitesPl: infosSites, isConnected: id, droits: droits });
            });
        });
    },

    mapsDisplay: function (req, res) {
        gestionMaps.getAllCoords(req, function(coords) {
            gestionCarriere.getAllNoms(req, function (nomSites) {
                identification.extractUserFromCookieToken(req, function (id, droits) {
                    res.render('pages/maps', {
                        coords: coords,
                        sitesPl: nomSites,
                        isConnected: id,
                        droits: droits
                    });
                });
            });
        });
    },

    deconnexion: async function (req, res, next) {
        identification.deleteToken(req, res);
        res.redirect('/');
    },

    formImageDisplay: function (req, res) {
        res.render('pages/testform');
    },


}