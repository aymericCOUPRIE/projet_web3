var affichageCarriere = require('../models/affichageCarriere');
var url = require('url');

module.exports = {
    display: function(req, res) {
        var pathname = url.parse(req.url).pathname;
        pathname = pathname.replace('/', '');

        affichageCarriere.getAllNoms(req, function(nomsSites) {
            affichageCarriere.getAllInfos(pathname, function (sitesInfos) {
                affichageCarriere.getAllImages(sitesInfos.recordset[0].idSitePl, function (images) {
                    res.render('presentationCarriere', {sitesPl: nomsSites.recordset, sitesInfos: sitesInfos.recordset, images: images.recordset});
                });
            });
        });
    },
};