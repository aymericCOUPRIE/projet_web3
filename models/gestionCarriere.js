var connection = require('../config/db');
//var sql = require('mssql/msnodesqlv8');

module.exports = {
    getAllImages: function (req, cb) {
        //var request = new sql.Request(connection);
        //request.input('idCarriere', req);
        //request.query("SELECT * FROM Images WHERE idSitePl = @idCarriere", function (err, result) {
        connection.query("SELECT * FROM Images WHERE idSitePl = ?", [req],  function (err, result) {
            if(err) {
                console.log(err);
            } else {
                cb(result);
            }
        });
    },

    getAllNoms: function (req, cb) {
        //var request = new sql.Request(connection);
        //request.query("SELECT nomSitePl FROM sitePlongee ORDER BY nomSitePl", function(err, result) {
        connection.query("SELECT nomSitePl FROM sitePlongee ORDER BY nomSitePl", function(err, result) {
            if(err) {
               console.log(err);
            } else {
               cb(result);
            }
        });
    },

    getAllNomsAndDesc: function(req, cb) {
        //var request = new sql.Request(connection);
        //request.query("SELECT nomSitePl, descSitePl FROM sitePlongee ORDER BY nomSitePl", function(err, result) {
        connection.query("SELECT nomSitePl, descSitePl FROM sitePlongee ORDER BY nomSitePl", function(err, result) {
            if(err) {
                console.log(err);
            } else {
                cb(result);
            }
        });
    },

    getAllInfos: function (req, cb) {
        //var request = new sql.Request(connection);
        //request.input('name', req);
        //request.query("SELECT * FROM sitePlongee WHERE nomSitePl = @name", function (err, result) {
        connection.query("SELECT * FROM sitePlongee WHERE nomSitePl = ?", [req], function (err, result) {
            if (err) {
                console.log(err)
            } else {
                cb(result);
            }
        });
    },

    deleteCarriere: function (req, cb) {
        //var request = new sql.Request(connection);
        //request.input("nomSite", req);
        //request.query("DELETE FROM SitePlongee WHERE nomSitePl = @nomSite", function (err, result) {
        connection.query("DELETE FROM SitePlongee WHERE nomSitePl = ?", [req], function (err, result) {
            if(err) {
                console.log(err);
            } else {
                cb(result);
            }
        });
    },

    verifSiteUnique: function (req, cb) {
        //var request = new sql.Request(connection);
        //request.input('nom', req);
        //request.query("SELECT nomSitePl FROM SitePlongee WHERE nomSitePl = @nom", function (err, result) {
          connection.query("SELECT nomSitePl FROM SitePlongee WHERE nomSitePl = ?", [req], function (err, result) {
            if(err) {
                console.log(err)
            } else {
                console.log(result.recordset[0] == null);
                if(result.recordset[0] == null) {
                    cb(0);
                } else {
                    cb(1);
                }
            }
        });
    },

    ajoutSite: function (req, cb) {
        //var request = new sql.Request(connection);

        //request.input('nom', req[0]);
        //request.input('profondeur', req[1]);
        //request.input('longitude', req[2]);
        //request.input('latitude', req[3]);
        //request.input('description', req[4]);

        //request.query("INSERT INTO sitePlongee (nomSitePl, profondeurSitePl, longitude, latitude, descSitePl) VALUES (@nom, @profondeur, @longitude, @latitude, @description)", function (err, result ) {
         connection.query("INSERT INTO sitePlongee (nomSitePl, profondeurSitePl, longitude, latitude, descSitePl) VALUES (?, ?, ?, ?, ?)", req, function (err, result ) {
            if(err) {
                console.log(err);
            } else {
                cb(result);
            }
        })
    },

    updateSite: function (req, id, cb) {
        //var request = new sql.Request(connection);

        //request.query("UPDATE sitePlongee SET nomSitePl = @nom, profondeur = @profondeur, longitude = @longitude, latitude = @latitude, descSitePl = @desc WHERE idSitePl = @id", function (err, result) {
          connection.query("UPDATE sitePlongee SET nomSitePl = ?, profondeur = ?, longitude = ?, latitude = ?, descSitePl = ? WHERE idSitePl = ?", req, id, function (err, result) {

            if(err) {
                console.log(err)
            } else {
                cb(result);
            }
        });

    }
}