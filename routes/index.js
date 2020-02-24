

var express = require('express');
var router = express.Router();
var app = express();



router.get('/', function (req, res, next) {
    getData(function (recordset) {
        res.render('index', { sitesPl: recordset.recordset })
    });
});

router.get('/login', function (req, res, next) {
    app.use('/login', );
});

router.get('/CarriereTest*', function (req, res, next) {
    getData(function (recordset) {
        res.render('index', { sitesPl: recordset.recordset})
    });
});




function getData(callback) {
    var request = new sql.Request(connection);
    request.query('select * from SitePlongee', function (err, recordset) {
        callback(recordset);
    });
}

function getCarriere(callback) {
    var request = new sql.Request(connection);
    request.query("select * from SitePlongee WHERE nomSitePl='CarriereTest1'", function (err, recordset) {
        console.log(recordset);
        callback(recordset);
    });
}

module.exports = router;



