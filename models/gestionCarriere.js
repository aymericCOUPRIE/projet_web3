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
        connection.query("SELECT DISTINCT nomSitePl, descSitePl, nomImg FROM sitePlongee LEFT JOIN images ON images.idSitePl = siteplongee.idSitePl ORDER BY nomSitePl", function(err, result) {
            if(err) {
                console.log(err);
            } else {
                cb(result);
            }
        });
    },

    getAllInfos: function (req, cb) {
        connection.query("SELECT idSitePl, nomSitePl, profondeurSitePl, longitude, latitude, descSitePl, (\n" +
                            "    SELECT ROUND(AVG(avis), 2) FROM visite WHERE idSite = (\n" +
                            "        SELECT idSitePl FROM siteplongee WHERE nomSitePl = ?\n" +
                            "    )\n" +
                            ") as avgNote FROM sitePlongee WHERE nomSitePl = ?", [req, req], function (err, result) {
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
                console.log(result[0] == null);
                if(result[0] == null) {
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

    updateSite: function (req, cb) {
          connection.query("UPDATE sitePlongee SET nomSitePl = ?, profondeurSitePl = ?, longitude = ?, latitude = ?, descSitePl = ? WHERE idSitePl = ? ", req, function (err, result) {
            if(err) {
                console.log(err);
            } else {
                cb(result);
            }
        });

    },

    insertImage: function (path, id, cb) {
        connection.query("INSERT INTO images (nomImg, idSitePl) VALUES (?, ?)", [path, id], function (err, result) {
            if(err) {
                console.log(err);
            } else {
                cb(result);
            }
        });
    },
};