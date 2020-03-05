var multer = require('multer');
var multerGoogleStorage = require('multer-google-storage');
const { Storage } = require('@google-cloud/storage');
var path = require('path');

var uploadHandler = multer({
    storage: multerGoogleStorage.storageEngine({
        keyFilename: "./platinum-avenue-270020-f889a4f9b841.json",
        projectId: 'platinum-avenue-270020',
        bucket: 'projetweb'
    })
});

const gc = new Storage({
    keyFilename: path.join(__dirname, './platinum-avenue-270020-f889a4f9b841.json'),
    projectId: 'platinum-avenue-270020'
});

const projetweb = gc.bucket('projetweb');

module.exports = uploadHandler;
