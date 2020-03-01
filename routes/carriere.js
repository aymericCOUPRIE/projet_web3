
var express = require('express');
var router = express.Router();
var carriere = require('../controllers/carriereCtrl');

router.get('/*', carriere.display);

module.exports = router;