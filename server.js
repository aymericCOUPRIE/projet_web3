'use strict';
var debug = require('debug');
var express = require('express');
var sanitizer = require('express-sanitizer');
var path = require('path');
var logger = require('morgan');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var multerGoogleStorage = require('multer-google-storage');
const { Storage } = require('@google-cloud/storage');

//var favicon = require('serve-favicon');

var app = express();

//gestion des routes
var routes = require('./routes/home');
var user = require('./routes/user');
var carriere = require('./routes/carriere');
var admin = require('./routes/admin');


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

//pas sur que ce soit nécessaire
app.use(methodOverride('_method'));

//raccourcis pour les routes
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