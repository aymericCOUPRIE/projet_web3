

var express = require('express');
var router = express.Router();
var admin = require('../controllers/adminCtrl.js');
var home = require('../controllers/usersCtrl');

router.get('/ajoutSite', admin.afficheFormulaire);
router.get('/modifierSite', admin.afficherModification);

router.post('/ajoutSite', admin.ajoutSite, home.accueil);
router.delete('/?*', admin.deleteCarriere, home.accueil);
router.put('/?*', admin.modifierSite);
module.exports = router;