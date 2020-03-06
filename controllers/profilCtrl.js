const identification = require('../models/identification');
const gestionVisit = require('../models/gestionVisite');
const gestionUser = require('../models/gestionUser');
const gestionCertification = require('../models/gestionCertifications');

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
        console.log(req);






        gestionUser.updateInfos( req, function (result) {

        });
    },

    listeVisiteDisplay: function (req, res) {
        identification.extractUserFromCookieToken(req, function (id, droits) {
            res.render('pages/user/informationPerso', {isConnected: id, droits: droits});
        });
    },

    planningDisplay: function(req, res) {
        res.render('pages/user/planning');
    },

    ajoutVisit: function (req, res) {
        gestionVisit.insertVisit();
    },
}