const identification = require('../models/identification');
const gestionVisit = require('../models/gestionVisite');
const gestionUser = require('../models/gestionUser');
const gestionCertification = require('../models/gestionCertifications');
const url = require('url');
const moment = require('moment');

module.exports = {

    infosPersonnellesDisplay: function (req, res) {
        identification.extractUserFromCookieToken(req, function (id, droits) {
            gestionUser.getAllInfosUsers(id, function (userInfos) {
                gestionCertification.getAllCertification(req, function (certifs) {
                    res.render('pages/user/informationPerso', {userCertifs: certifs, userInfos: userInfos, isConnected: id, droits: droits});
                });
            });
        });
    },


    updateInfosPerso: function(req, res) {
        console.log(req.body)
       for (let item of req.body) {
            console.log(item)
        }
/*        req.body.forEach(function (name) {
              console.log(name);
        });*/
        res.redirect('/profil/infosPerso');
//        gestionUser.updateInfos( req, function (result) {
//
//        });
    },

    listeVisiteDisplay: function (req, res) {
        identification.extractUserFromCookieToken(req, function (id, droits) {
            gestionUser.getAllVisitUser(id, function (visits) {
                res.render('pages/user/listeVisites', {listVisit: visits, isConnected: id, droits: droits, moment: moment});
            });
        });
    },

    planningDisplay: function(req, res) {
        res.render('pages/user/planning');
    },

    ajoutVisit: function (req, res) {
        var pathname = url.parse(req.url).pathname;
        pathname = pathname.split('/')[2];

        identification.extractUserFromCookieToken(req, function (id, droits) {
            console.log(id, droits);
            gestionVisit.insertVisit(id, pathname,   function (result) {
                res.redirect('/profil/listeVisites');
            });
        });
    },

    updateVisite: function (req, res) {
        var avis = req.sanitize(req.body.note);
        var nomSite = req.sanitize(req.body.nomSite);
        var date = req.sanitize(req.body.dateV);

        identification.extractUserFromCookieToken(req, function (id, droits) {
            const infos = [avis, id, nomSite, date];
            gestionVisit.updateVisite(infos, function (result) {
                res.redirect('/profil/listeVisites');
            })
        });
    }
};