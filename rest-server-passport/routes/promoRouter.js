/**
 * Created by taowang on 11/21/2016.
 */
var express = require('express');
var bodyParser = require('body-parser');
var Promotions = require('../models/promotions');

var promotionRouter = express.Router();

var Verify = require('./verify');

//Signal to us that req.body will be converted to a JS object!!!
promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
    .get(function (req, res, next) {
        Promotions.find(req.query, function (err, promotion) {
            if (err) next(err);
            res.json(promotion); //Automatically set the content-type:application/json and status code 200, so no need to res.writeHead() and res.end()
        })
    })
    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Promotions.create(req.body, function (err, promotion) {
            if (err) next(err);
            console.log('Promotion created!');
            var id = promotion._id;

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the promotion with id: ' + id);
        });
    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Promotions.remove({}, function (err, result) {
            if (err) next(err);
            res.json(result);
        })
    });

promotionRouter.route('/:promotionId')
    .get(function (req, res, next) {
        Promotions.findById(req.params.promotionId, function (err, promotion) {
            if (err) next(err);
            res.json(promotion);
        })
    })
    .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Promotions.findByIdAndUpdate(req.params.promotionId, {$set: req.body}, {new: true},
            function (err, promotion) {
                if (err) next(err);
                res.json(promotion);
            })
    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
        Promotions.findByIdAndRemove(req.params.promotionId, function (err, resp) {
            if(err) next(err);
            res.json(resp);
        })
    });

//export the promoRouter object!
module.exports = promotionRouter;