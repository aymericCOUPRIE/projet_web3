var affichageCarriere = require('../models/gestionCarriere');
var identification = require('../models/identification');
var url = require('url');

module.exports = {
    display: function(req, res) {
        var pathname = url.parse(req.url).pathname;
        pathname = pathname.replace('/', '');

        affichageCarriere.getAllNoms(req, function(nomsSites) {
            affichageCarriere.getAllInfos(pathname, function (sitesInfos) {
                affichageCarriere.getAllImages(sitesInfos.recordset[0].idSitePl, function (images) {
                    identification.extractUserFromCookieToken(req, function(id, droits) {
                        res.render('presentationCarriere', {sitesPl: nomsSites.recordset, sitesInfos: sitesInfos.recordset, images: images.recordset, isConnected: id, droits:droits});
                    })
                });
            });
        });
    },
};