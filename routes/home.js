

var express = require('express');
var router = express.Router();
var home = require('../controllers/usersCtrl');

router.get('/', home.accueil);
router.post('/', home.selection);

router.get('/CarriereTest*', home.choixCarriere);
router.get('/login', home.login);

module.exports = router;

//app.get('/', home.accueil);