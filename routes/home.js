var express = require('express');
var router = express.Router();
var home = require('../controllers/usersCtrl');

router.get('/', home.accueil);
router.get('/home', home.accueil);
router.get('/maps', home.mapsDisplay);
router.get('/planning', home.planningDisplay);
router.get('/deconnexion', home.deconnexion);

router.get('/upload', home.formImageDisplay);
router.post('/upload', home.uploadImage);

module.exports = router;