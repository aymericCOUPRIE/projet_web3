const identification = require('../models/identification');
const gestionVisit = require('../models/gestionVisite');

module.exports = {

    infosPersonnellesDisplay: function (req, res) {
        identification.extractUserFromCookieToken(req, function (id, droits) {
            res.render('pages/user/informationPerso', {isConnected: id, droits: droits});
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
    }
}