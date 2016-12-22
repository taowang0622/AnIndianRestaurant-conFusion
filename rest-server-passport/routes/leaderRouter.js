
var express = require('express');
var bodyParser = require('body-parser');
var Leaders = require('../models/leadership');

var leaderRouter = express.Router();

var Verify = require('./verify');

//Signal to us that req.body will be converted to a JS object!!!
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    .get(function (req, res, next) {
        Leaders.find(req.query, function (err, leader) {
            if (err) next(err);
            res.json(leader); //Automatically set the content-type:application/json and status code 200, so no need to res.writeHead() and res.end()
        })
    })
    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Leaders.create(req.body, function (err, leader) {
            if (err) next(err);
            console.log('Leader created!');
            var id = leader._id;

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the leader with id: ' + id);
        });
    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Leaders.remove({}, function (err, result) {
            if (err) next(err);
            res.json(result);
        })
    });

leaderRouter.route('/:leaderId')
    .get(function (req, res, next) {
        Leaders.findById(req.params.leaderId, function (err, leader) {
            if (err) next(err);
            res.json(leader);
        })
    })
    .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Leaders.findByIdAndUpdate(req.params.leaderId, {$set: req.body}, {new: true},
            function (err, leader) {
                if (err) next(err);
                res.json(leader);
            })
    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Leaders.findByIdAndRemove(req.params.leaderId, function (err, resp) {
            if(err) next(err);
            res.json(resp);
        })
    });

//export the leaderRouter object!
module.exports = leaderRouter;