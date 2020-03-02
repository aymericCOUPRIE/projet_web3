var connection = require('../config/db');
var sql = require('mssql/msnodesqlv8');

module.exports = {
    getAllImages: function (req, cb) {
        var request = new sql.Request(connection);
        request.input('idCarriere', req);
        request.query("SELECT * FROM Images WHERE idSitePl = @idCarriere", function (err, result) {
            if(err) {
                console.log(err);
            } else {
                cb(result);
            }
        });
    },

    getAllNoms: function (req, cb) {
        var request = new sql.Request(connection);
        request.query("SELECT nomSitePl FROM sitePlongee ORDER BY nomSitePl", function(err, result) {
           if(err) {
               console.log(err);
           } else {
               cb(result);
           }
        });
    },

    getAllInfos: function (req, cb) {
        var request = new sql.Request(connection);
        request.input('name', req);
        request.query("SELECT * FROM sitePlongee WHERE nomSitePl = @name", function (err, result) {
            if (err) {
                console.log(err)
            } else {
                cb(result);
            }
        });
    },

    deleteCarriere: function (req, cb) {
        var request = new sql.Request(connection);
        request.input("nomSite", req);
        request.query("DELETE FROM SitePlongee WHERE nomSitePl = @nomSite", function (err, result) {
            if(err) {
                console.log(err);
            } else {
                cb(result);
            }
        });
    }
}