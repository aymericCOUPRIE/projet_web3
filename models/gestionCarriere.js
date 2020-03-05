var connection = require('../config/db');

module.exports = {
    getAllImages: function (req, cb) {
        connection.query("SELECT * FROM Images WHERE idSitePl = ?", [req],  function (err, result) {
            if(err) {
                console.log(err);
            } else {
                cb(result);
            }
        });
    },

    getAllNoms: function (req, cb) {
        connection.query("SELECT nomSitePl FROM sitePlongee ORDER BY nomSitePl", function(err, result) {
            if(err) {
               console.log(err);
            } else {
               cb(result);
            }
        });
    },

    getAllNomsAndDesc: function(req, cb) {
        connection.query("SELECT nomSitePl, descSitePl FROM sitePlongee ORDER BY nomSitePl", function(err, result) {
            if(err) {
                console.log(err);
            } else {
                cb(result);
            }
        });
    },

    getAllInfos: function (req, cb) {
        connection.query("SELECT * FROM sitePlongee WHERE nomSitePl = ?", [req], function (err, result) {
            if (err) {
                console.log(err)
            } else {
                cb(result);
            }
        });
    },

    deleteCarriere: function (req, cb) {
        connection.query("DELETE FROM SitePlongee WHERE nomSitePl = ?", [req], function (err, result) {
            if(err) {
                console.log(err);
            } else {
                cb(result);
            }
        });
    },

    verifSiteUnique: function (req, cb) {
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
         connection.query("INSERT INTO sitePlongee (nomSitePl, profondeurSitePl, longitude, latitude, descSitePl) VALUES (?, ?, ?, ?, ?)", req, function (err, result ) {
            if(err) {
                console.log(err);
            } else {
                cb(result);
            }
        })
    },

    updateSite: function (req, id, cb) {
          connection.query("UPDATE sitePlongee SET nomSitePl = ?, profondeur = ?, longitude = ?, latitude = ?, descSitePl = ? WHERE idSitePl = ?", req, id, function (err, result) {

            if(err) {
                console.log(err)
            } else {
                cb(result);
            }
        });

    }
}