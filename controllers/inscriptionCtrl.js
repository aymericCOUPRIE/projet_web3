
module.exports = {
    render: function (req, res) {
        res.render('inscription');
    },

    sub: function (req, res) {
        var request = new sql.Request(connection);

        const mail = req.body.mail;
        request.input('mail', mail);
        request.query("INSERT INTO Users (mailUser) VALUES (@mail)", function (err, recordset) {
            connection.close();
        });

        res.redirect('/');
    }
}