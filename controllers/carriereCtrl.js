var connection = require('../config/db');
var sql = require('mssql/msnodesqlv8');
var affichageCarriere = require('../models/affichageCarriere');
var url = require('url');

module.exports = {
    display: function(req, res) {
        var request = new sql.Request(connection);
        var pathname = url.parse(req.url).pathname;
        pathname = pathname.replace('/', '');

        request.query('SELECT * FROM SitePlongee', function (err, data) {
            request.input('pathname', pathname);
            console.log("TEST ne fonctionne pas ",  pathname);
            request.query("SELECT * FROM SitePlongee WHERE nomSitePl = @pathname", function (err, dataInfo) {
                affichageCarriere.getAllImages(dataInfo.recordset[0].idSitePl, function (result) {
                    res.render('index2', {sitesPl: data.recordset, sitesInfos: dataInfo.recordset, images: result.recordset});
                })
            })
        });
    },
}