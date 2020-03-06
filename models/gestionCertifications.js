const connection = require('../config/db');

module.exports = {
    getAllCertification: function (req, cb) {
        connection.query("SELECT * FROM \n" +
            "    (SELECT labelNiv, descNiv, idUser \n" +
            "    FROM certifications\n" +
            "    NATURAL LEFT JOIN certifusers) as c3\n" +
            "WHERE c3.idUser IS NULL OR idUser = 3", req,function (err, result) {
            if(err) {
                console.log(err);
            } else {
                cb(result);
            }
        })
    },
};
