var express = require('express');
var router = express.Router();
var identification = require('../models/identification');
var profil = require('../controllers/profilCtrl');


router.use( function (req,res, next) {
    identification.extractUserFromCookieToken(req, function (id, droits) {
        if(droits != 0) {
            next();
        } else {
            console.log("ERROR : VOUS N'ETES PAS CONNECTE");
            res.redirect('/');
        }
    });
});

router.get('/infosPerso', profil.infosPersonnellesDisplay);
router.put('/updateInfos', profil.updateInfosPerso);

router.get('/planning', profil.planningDisplay);

router.get('/listeVisites', profil.listeVisiteDisplay);
router.put('/updateNoteVisit/?*', profil.updateVisite);
router.post('/addToVisit*', profil.ajoutVisit);

module.exports = router;