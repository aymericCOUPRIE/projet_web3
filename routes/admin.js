

var express = require('express');
var router = express.Router();
var admin = require('../controllers/adminCtrl.js');


router.use( function (req,res, next) {
    admin.isAdmin(req, function (result) {
        if(result) {
            next();
        } else {
            console.log("ERROR : VOUS N'ETES PAS ADMIN");
            res.redirect('/');
        }
    });
});

router.get('/ajoutSite', admin.afficheFormulaire);
router.get('/modifierSite/*', admin.afficherModification);

router.post('/ajoutSite', admin.ajoutSite);
router.delete('/supprimerSite/?*', admin.deleteCarriere);
router.put('/modifierSite/?*', admin.modifierSite);

module.exports = router;