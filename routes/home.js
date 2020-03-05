var express = require('express');
var router = express.Router();
var home = require('../controllers/usersCtrl');
var multer = require("multer");
var multerGoogleStorage = require('multer-google-storage');

var uploadHandler = multer({
    storage: multerGoogleStorage.storageEngine({
        keyFilename: "./platinum-avenue-270020-f889a4f9b841.json",
        projectId: 'platinum-avenue-270020',
        bucket: 'projetweb'
    })
});

router.get('/', home.accueil);
router.get('/home', home.accueil);
router.get('/maps', home.mapsDisplay);
router.get('/deconnexion', home.deconnexion);


router.get('/upload', home.formImageDisplay);
router.post('/upload', uploadHandler.any(), function (req, res) {
    res.json(req.files);
});

module.exports = router;