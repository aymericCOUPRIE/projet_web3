var gestionCarriere = require('../models/gestionCarriere');
var identification = require('../models/identification');
var url = require('url');
var multer = require("multer");
var multerGoogleStorage = require('multer-google-storage');



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
        const id = req.sanitize(req.body.idCarriere);

        if(nom == null || profondeur == null || longitude == null || latitude == null || description == null || id == null) {
            return res.status(400).json({ 'error': 'missing parameters'})
        }

        var sitesInfos = [nom, profondeur, longitude, latitude, description, id];

        gestionCarriere.verifSiteUnique(nom, function (result) {
            if(result) {
                gestionCarriere.updateSite(sitesInfos, function(result) {
                    console.log(result);
                });
            } else {
                console.log("ERROR : LE NOM EXISTE DEJA EN BASE");
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
    },

    insertImage: function (req, res) {

        const id = req.sanitize(req.body.idCarriere);
        console.log(id);
        console.log(req.files[0].path);

        gestionCarriere.insertImage(req.files[0].path, id, function (err, result) {
            res.redirect('/admin/ajoutSite');
        });
    },
}