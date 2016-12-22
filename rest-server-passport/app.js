//core and third-party modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

//file-based modules
var index = require('./routes/index');
var users = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');
var favoritesRouter = require('./routes/favoritesRouter');
var config = require('./config');

var app = express();

//Connect to the mongoDB server!!!!!!!!!!
var mongoose = require('mongoose');
mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
   console.log("Connected correctly to the mongoDB server");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../conFusion-Angular'))); //Angular Client!!!!!!!!!!!!!

//passport config
app.use(passport.initialize());
var authenticate = require('./authenticate');

//Secure traffic only
//app.all will match all REST methods!!!!!
//'*' will match all urls
app.all('*', function (req, res, next) {
    console.log('req start: ', req.secure, req.hostname, req.url, app.get('port'));
    if(req.secure)    //http=====>req.secure=false    https=====>req.secure=true
        return next();

    res.redirect('https://' + req.hostname + ':' + app.get('secPort') + req.url); //Note that req.url does not include schema and hostname and port!!!!
});

app.use('/', index);
app.use('/users', users);
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leadership', leaderRouter);
app.use('/favorites', favoritesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({     //Since the client is ionic/angular application, easier to handler JSON string
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

module.exports = app;
