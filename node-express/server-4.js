/**
 * Created by taowang on 11/21/2016.
 */
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

//application-level
var app = express();

app.use(morgan('dev'));

//router-level
var dishRouter = express.Router();

dishRouter.use(bodyParser.json());

//Equivalent to a servlet
dishRouter.route('/')
    .all(function (req, res, next) {
        res.writeHead(200, {'content-type': 'text/plain'});
        next();
    })
    .get(function (req, res, next) {
        res.end('Will send all the dishes to you');
    })
    .post(function (req, res, next) {
        res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
    })
    .delete(function (req, res, next) {
        res.end('Deleting all the dishes');
    });

//Equivalent to another servlet
dishRouter.route('/:dishId')
    .all(function (req, res, next) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        next();
    })
    .get(function (req, res, next) {
        res.end('Will send details of the dish: ' + req.params.dishId + ' to you!');
    })
    .put(function (req, res, next) {
        res.write('Updating the dish: ' + req.params.dishId + '\n');
        res.end('Will update the dish: ' + req.body.name +
            ' with details: ' + req.body.description);
    })
    .delete(function (req, res, next) {
        res.end('Deleting dish: ' + req.params.dishId);
    });

// here '/dishes' as in '/web_project_template' in Netease Servlet course
app.use('/dishes', dishRouter);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function () {
   console.log(`Server running at http://${hostname}:${port}/`)
});