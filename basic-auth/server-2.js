var express = require('express');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

// app.use(morgan('dev'));
app.use(morgan('dev'));

app.use(cookieParser('1234-sdfsf-fddsf-43')); //secret key!!


//Use authentication middleware
app.use(function(req, res, next) {
    //For the first time logging in
    if(!req.signedCookies.user){
        var authHeader = req.headers.authorization;

        //in case user turns down inputting anything pressing the cancel button
        if (!authHeader) {
            let err = new Error('You are not authenticated!');
            err.status = 401;
            return next(err); //if no return, below code will be executed, because NodeJS is asynchronous!!!!!!
        }

        var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');

        var userName = auth[0];
        var password = auth[1];

        if(userName === 'administrator' && password === 'password'){
            res.cookie('user', 'administrator', {signed: true, httpOnly: true, maxAge: 900000}); //Create a cookie representing a key-value pair
            next(); //authorized
        }
        else{
            let err = new Error('You are not authenticated!!!');
            err.status = 401;
            next(err);
        }
    }
    else{
        if(req.signedCookies.user === 'administrator')
            next();
        else {
            var err = new Error('You are not authenticated!');
            err.status = 401;
            next(err);
        }
    }
});

//access the static resources
app.use(express.static(__dirname + '/public'));

//error handler
app.use(function (err, req, res, next) {
    res.writeHead(err.status || 500, { //If you don't know what else to tell client, use 500 that means internal server error!!!!
        'WWW-Authenticate': 'Basic',
        'Content-Type': 'text/plain'
    });
    res.end(err.message);
});

app.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`)
});