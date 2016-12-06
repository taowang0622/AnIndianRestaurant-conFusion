/**
 * Created by taowang on 11/21/2016.
 */
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Dishes = require('../models/dishes'); //Use this to CRUD collection dishes!!!

var dishRouter = express.Router();

//Signal to us req.body will be converted into a JS object!!!
dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .get(function (req, res, next) {
        Dishes.find({}, function (err, dish) {
            if (err) throw err; //throw to error handlers in app.js to handle!!!
            res.json(dish); //Automatically set the content-type:application/json and status code 200, so need to res.writeHead() and res.end()
        })
    })
    .post(function (req, res, next) {
        Dishes.create(req.body, function (err, dish) {
            if (err) throw err;
            console.log('Dish created!');
            var id = dish._id;

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the dish with id: ' + id);
        });
    })
    .delete(function (req, res, next) {
        Dishes.remove({}, function (err, result) {
            if (err) throw err;
            res.json(result);
        })
    });

dishRouter.route('/:dishId')
    .get(function (req, res, next) {
        Dishes.findById(req.params.dishId, function (err, dish) {
            if (err) throw err;
            res.json(dish);
        })
    })
    .put(function (req, res, next) {
        Dishes.findByIdAndUpdate(req.params.dishId, {$set: req.body}, {new: true},
            function (err, dish) {
                if (err) throw err;
                res.json(dish);
            })
    })
    .delete(function (req, res, next) {
        Dishes.findByIdAndRemove(req.params.dishId, function (err, resp) {
            if(err) throw err;
            res.json(resp);
        })
    });

dishRouter.route('/:dishId/comments')
    .get(function (req, res, next) {
        Dishes.findById(req.params.dishId, function (err, dish) {
            if(err) throw err;
            res.json(dish.comments);
        })
    })
    .post(function (req, res, next) {
        Dishes.findById(req.params.dishId, function (err, dish) {
            if(err) throw err;

            dish.comments.push(req.body); //Due to bodyParser.json(), req.body is a js object
            dish.save(function (err, dish) {
                if(err) throw err;
                console.log('Updated comments!');
                res.json(dish);
            })
        })
    })
    .delete(function (req, res, next) {
        Dishes.findById(req.params.dishId, function (err, dish) {
            if(err) throw err;
            for(var i = (dish.comments.length -1); i >=0; i--){
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save(function (err, result) {
                if(err) throw err;
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('Deleted all comments!!!!');
            })
        })
    });

dishRouter.route('/:dishId/comments/:commentId')
    .get(function (req, res, next) {
        Dishes.findById(req.params.dishId, function (err, dish) {
            if(err) throw err;

            res.json(dish.comments.id(req.params.commentId));
        })
    })
    .put(function (req, res, next) {
        // We delete the existing commment and insert the updated
        // comment as a new comment
        Dishes.findById(req.params.dishId, function (err, dish) {
            if(err) throw err;

            dish.comments.id(req.params.commentId).remove();

            dish.comments.push(req.body);
            dish.save(function (err, dish) {
                if(err) throw err;
                console.log('Updated Comments!!!!');
                res.json(dish);
            })
        })
    });

//export the promoRouter object!
module.exports = dishRouter;