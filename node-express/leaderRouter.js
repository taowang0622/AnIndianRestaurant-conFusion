/**
 * Created by taowang on 11/21/2016.
 */
/**
 * Created by taowang on 11/21/2016.
 */
var express = require('express');
var bodyParser = require('body-parser');

var leaderRouter = express.Router();

//use a middleware
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    .all(function (req, res, next) {
        res.writeHead(200, {'content-type': 'text/plain'});
        next();
    })
    .get(function (req, res, next) {
        res.end('Will send all the leaders to you');
    })
    .post(function (req, res, next) {
        res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
    })
    .delete(function (req, res, next) {
        res.end('Deleting all the leaders');
    });

leaderRouter.route('/:id')
    .all(function (req, res, next) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        next();
    })
    .get(function (req, res, next) {
        res.end('Will send details of the leader: ' + req.params.id + ' to you!');
    })
    .put(function (req, res, next) {
        res.write('Updating the leader: ' + req.params.id + '\n');
        res.end('Will update the leader: ' + req.body.name +
            ' with details: ' + req.body.description);
    })
    .delete(function (req, res, next) {
        res.end('Deleting leader: ' + req.params.dishId);
    });

//export the leaderRouter object!
module.exports = leaderRouter;