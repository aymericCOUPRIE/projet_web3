

var express = require('express');
var router = express.Router();
var register = require('../controllers/inscriptionCtrl');

router.get('/', register.loginDisplay);
router.post('/', register.loginVerif);


router.get('/inscription', register.subscribe);
router.post('/inscription', register.sub);

module.exports = router;
