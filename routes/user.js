

var express = require('express');
var router = express.Router();
var register = require('../controllers/inscriptionCtrl');
var home = require('../controllers/usersCtrl');

router.get('/', register.loginDisplay);
router.post('/', register.loginVerif, register.loginDisplay);

router.get('/inscription', register.subscribe);
router.post('/inscription', register.sub);

module.exports = router;
