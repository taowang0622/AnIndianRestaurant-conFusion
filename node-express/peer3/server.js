var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http = require('http');

var hostname = 'localhost';
var port = 3000;

var dishR = require('./dishRouter');
var leadR = require('./leaderRouter');
var promR = require('./promoRouter');

var app = express();

//app.set('view engine', 'hbs');

//app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use('/dishes', dishR);
app.use('/leadership', leadR);
app.use('/promotions', promR);

// catch 404 and forward to error handler
app.use(function (req, res) {
    res.render('error');
});
// error handlers



http.createServer(app).listen(port,hostname,function(){
	  console.log('Server running at http://'+hostname+':'+port);
})