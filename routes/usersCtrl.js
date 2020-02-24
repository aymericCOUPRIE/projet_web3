var express = require('express');
var router = express.Router();

router.route('/').get(function (res, req) {
    res.render('inscription', {title: 'test'});
}).post(function (res, req) {
    var data = {
        nom: req.body.name,
        prenom: req.body.prenom,
        mail: req.body.mail,
        pwd: req.body.pwd,
        age: req.body.age
    }
    res.send('User created');

})

module.exports = router;