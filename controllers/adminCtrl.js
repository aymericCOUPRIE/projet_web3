var gestionCarriere = require('../models/gestionCarriere');
var identification = require('../models/identification');
var url = require('url');


module.exports = {
    afficheFormulaire: function (req, res) {
        identification.extractUserFromCookieToken(req, function (id, droits) {
            res.render('pages/admin/ajoutSite', { isConnected: id, droits: droits });
        });
    },

    ajoutSite: function (req, res, next) {
        const nom = req.sanitize(req.body.nomSite);
        const profondeur = req.sanitize(req.body.profondeur);
        const longitude = req.sanitize(req.body.longitude);
        const latitude = req.sanitize(req.body.latitude);
        const description = req.sanitize(req.body.description);

        if(nom == null || profondeur == null || longitude == null || latitude == null || description == null ) {
            return res.status(400).json({ 'error': 'missing parameters'})
        }

        var sitesInfos = [nom, profondeur, longitude, latitude, description];
        gestionCarriere.verifSiteUnique(nom, function (result) {
            if(result) {
                res.redirect('/');
            } else {
                gestionCarriere.ajoutSite(sitesInfos, function (result) {
                    res.redirect('/');
                });
            }
        });
    },

    deleteCarriere: function (req, res, next) {
        gestionCarriere.deleteCarriere(req.body.deleteBtn, function (infos) {
            res.redirect('/');
        });
    },

    afficherModification: function (req, res) {
        identification.extractUserFromCookieToken(req, function (id, droits) {
            var pathname = url.parse(req.url).pathname;
            pathname = pathname.split('/')[2];
            gestionCarriere.getAllInfos(pathname, function (result) {
                res.render('pages/admin/updateSite', {sitesInfos: result[0], isConnected: id, droits: droits });
            })
        });
    },

    modifierSite: function (req, res) {

        const nom = req.sanitize(req.body.nomSite);
        const profondeur = req.sanitize(req.body.profondeur);
        const longitude = req.sanitize(req.body.longitude);
        const latitude = req.sanitize(req.body.latitude);
        const description = req.sanitize(req.body.description);

        if(nom == null || profondeur == null || longitude == null || latitude == null || description == null ) {
            return res.status(400).json({ 'error': 'missing parameters'})
        }

        var sitesInfos = [nom, profondeur, longitude, latitude, description];

        gestionCarriere.verifSiteUnique(nom, function (result) {
            if(result) {
                console.log("ERROR : LE NOM EXISTE DEJA EN BASE");
            } else {
                gestionCarriere.updateSite(sitesInfos);
            }
        });
        res.redirect('/');
    },

    isAdmin: function (req, res) {
        identification.extractUserFromCookieToken(req, function (id, droits) {
            if(droits == 2) {
                res(1);
            } else {
                res(0);
            }
        })
    }
}