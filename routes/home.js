

var express = require('express');
var router = express.Router();
var home = require('../controllers/usersCtrl');

router.get('/', home.accueil);
router.post('/', home.selection);

router.get('/home', home.accueil);
router.get('/maps', home.mapsDisplay);
router.get('/planning', home.planningDisplay);
router.get('/deconnexion', home.deconnexion, home.accueil);
router.get('/CarriereTest*', home.choixCarriere);

module.exports = router;