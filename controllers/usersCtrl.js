var connection = require('../config/db');
var sql = require('mssql/msnodesqlv8');

module.exports = {
    accueil: function (req, res) {

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
        request.query('select * from SitePlongee', function (err, data) {
            res.render('index', {sitesPl: data.recordset});
        });
    }
}

