var gestionCarriere = require('../models/gestionCarriere');
var identification = require('../models/identification');
module.exports = {
    afficheFormulaire: function (req, res) {
        identification.extractUserFromCookieToken(req, function (id, droits) {
            res.render('ajoutSite', { isConnected: id, droits: droits });
        });
    },

    ajoutSite: function (req, cb, next) {
        const nom = req.sanitize(req.body.nomSite);
        const profondeur = req.sanitize(req.body.profondeur);
        const longitude = req.sanitize(req.body.longitude);
        const latitude = req.sanitize(req.body.latitude);
        const description = req.sanitize(req.body.description);

        if(nom == null || profondeur == null || longitude == null || latitude == null || description == null ) {
            return res.status(400).json({ 'error': 'missing parameters'})
        }

        var sitesInfos = [nom, profondeur, longitude, latitude, description];
        console.log(sitesInfos);
        gestionCarriere.verifSiteUnique(nom, function (result) {
            if(result) {
                console.log("EXISTE DEJA EN BASE", result);
                next();
            } else {
                console.log("INSERTION");
                gestionCarriere.ajoutSite(sitesInfos, function (result) {
                    next();
                });
            }
        });
    },

    deleteCarriere: function (req, res, next) {
        gestionCarriere.deleteCarriere(req.body.test, function (infos) {
            next();
        });
    },

    afficherModification: function (req, res) {
        identification.extractUserFromCookieToken(req, function (id, droits) {
            res.render('updateSite', {isConnected: id, droits: droits });
        });
    },

    modifierSite: function (req, res) {

    }
}