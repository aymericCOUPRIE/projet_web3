var affichageCarriere = require('../models/gestionCarriere');
var identification = require('../models/identification');
var url = require('url');

module.exports = {
    display: function(req, res) {
        var pathname = url.parse(req.url).pathname;
        pathname = pathname.replace('/', '');

        affichageCarriere.getAllNoms(req, function(nomsSites) {
            affichageCarriere.getAllInfos(pathname, function (sitesInfos) {
                affichageCarriere.getAllImages(sitesInfos[0].idSitePl, function (images) {
                    identification.extractUserFromCookieToken(req, function(id, droits) {
                        res.render('pages/presentationCarriere', {sitesPl: nomsSites, sitesInfos: sitesInfos, images: images, isConnected: id, droits:droits});
                    })
                });
            });
        });
    },
};