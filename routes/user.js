

var express = require('express');
var router = express.Router();
var register = require('../controllers/inscriptionCtrl');

router.get('/form/inscription', register.render);
router.post('/form/inscription', register.sub);


module.exports = router;
