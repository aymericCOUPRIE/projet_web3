

var express = require('express');
var router = express.Router();
var home = require('../controllers/usersCtrl');

router.get('/', home.accueil);
router.post('/', home.selection);

router.get('/CarriereTest*', home.choixCarriere);

module.exports = router;