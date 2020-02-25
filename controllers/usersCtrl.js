var connection = require('../config/db');
var sql = require('mssql/msnodesqlv8');
var url = require('url');
var jwtCtrl = require('../config/jwt');


module.exports = {
    accueil: function (req, res) {
        var idUser = jwtCtrl.extractToken_cookie(req);
        console.log(idUser);

        var request = new sql.Request(connection);
        request.query('select * from SitePlongee', function (err, data) {
            res.render('index', {sitesPl: data.recordset});
        });
    },

    selection: function (req, res) {
        var request = new sql.Request(connection);
        request.query('select * from SitePlongee', function (err, data) {
            res.render('index', {sitesPl: data.recordset});
        });
    },

    choixCarriere: function(req, res) {

        var request = new sql.Request(connection);
        var pathname = url.parse(req.url).pathname;
        pathname = pathname.replace('/', '');
        console.log(pathname);

        request.query('select * from SitePlongee', function (err, data) {
            request.input('pathname', pathname);
            request.query("SELECT * FROM SitePlongee WHERE nomSitePl = @pathname", function (err, dataInfo) {
                if(err) {
                    console.log(err);
                } else {
                    console.log(dataInfo);
                }
                res.render('index2', {sitesPl: data.recordset, sitesInfos: dataInfo.recordset});
            })
        });
    },
}

