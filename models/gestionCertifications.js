const connection = require('../config/db');

module.exports = {
    getAllCertification: function (req, cb) {
        connection.query("SELECT * FROM certifications NATURAL LEFT JOIN (SELECT * FROM certifusers WHERE idUser = ?) as c3", [req],function (err, result) {
            if(err) {
                console.log(err);
            } else {
                cb(result);
            }
        })
    },
};
