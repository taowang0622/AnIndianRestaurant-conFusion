/**
 * Created by taowang on 11/21/2016.
 */
let express = require('express');
let morgan = require('morgan');
let dishRouter = require('./dishRouter');
let promoRouter = require('./promoRouter');
let leaderRouter = require('./leaderRouter');

let hostname = 'localhost';
let port = 3000;

//create an express application
let app = express();

//use a middleware
app.use(morgan('dev'));

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leadership', leaderRouter);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function () {
    console.log(`Listening to http://${hostname}:${port}`);
});
