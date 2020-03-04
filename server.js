'use strict';
var debug = require('debug');
var express = require('express');
var sanitizer = require('express-sanitizer');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
const uploadImage = require('./helpers/helpers');

var app = express();

var routes = require('./routes/home');
var user = require('./routes/user');
var carriere = require('./routes/carriere');
var admin = require('./routes/admin');

const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

app.disable('x-powered-by');
app.use(multerMid.single('file'));

app.get('/uploads', function (req, res, next) {
    console.log("TESST");
});

app.post('/uploads', async (req, res, next) => {
    console.log("JE SUIS LA");
    try {
        const myFile = req.file
        console.log("ARRIVE DANS LA REQUETE");
        const imageUrl = await uploadImage(myFile)
        res
            .status(200)
            .json({
                message: "Upload was successful",
                data: imageUrl
            })
    } catch (error) {
        next(error)
    }
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sanitizer());
app.use("/public", express.static(path.join(__dirname, '/public')));
app.use(methodOverride('_method', { methods: ['POST'] }));

app.use(methodOverride('_method'));

app.use('/', routes);
app.use('/login', user);
app.use('/carriere', carriere);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 8080);

//var server = app.listen(app.get('port'), function () {
//    debug('Express server listening on port ' + server.address().port);
//});
app.listen(8080);