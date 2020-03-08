

var express = require('express');
var router = express.Router();
var admin = require('../controllers/adminCtrl.js');

var multer = require("multer");
var multerGoogleStorage = require('multer-google-storage');

var uploadHandler = multer({
    storage: multerGoogleStorage.storageEngine({
        keyFilename: "./platinum-avenue-270020-f889a4f9b841.json",
        projectId: 'platinum-avenue-270020',
        bucket: 'projetweb'
    })
});

router.use( function (req,res, next) {
    admin.isAdmin(req, function (result) {
        if(result) {
            next();
        } else {
            console.log("ERROR : VOUS N'ETES PAS ADMIN");
            res.redirect('/');
        }
    });
});

router.get('/ajoutSite', admin.afficheFormulaire);
router.get('/modifierSite/*', admin.afficherModification);

router.post('/ajoutSite', admin.ajoutSite);
router.delete('/supprimerSite/?*', admin.deleteCarriere);
router.put('/modifierSite/?*', admin.modifierSite);

//router.get('/upload', home.formImageDisplay);
router.post('/uploadPhoto', uploadHandler.any(), function (req, res) {
    //admin.insertImage(req.files[0].path);
    res.redirect('/');
//    console.log(req.files[0].path);
});

module.exports = router;