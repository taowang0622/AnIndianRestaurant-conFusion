/**
 * Created by taowang on 12/13/2016.
 */
var express = require('express');
var bodyParser = require('body-parser');
var Favorites = require('../models/favorites');

var favoritesRouter = express.Router();

var verify = require('./verify');

favoritesRouter.use(bodyParser.json());

favoritesRouter.route('/')
    .all(verify.verifyOrdinaryUser) //req.decoded is available after executing verify.verifyOrdinaryUser(req, res, next)
    .get(function (req, res, next) {
        Favorites.findOne({postedBy: req.decoded._id})
            .populate('dishes')
            .populate('postedBy')
            .exec(function (err, favorites) {
                if(err) throw err;

                res.json(favorites);
            })
    })
    .post(function (req, res, next) {
        Favorites.findOne({"postedBy": req.decoded._id}, function (err, doc) {
            if (err) throw err;

            if (doc === null) {
                Favorites.create({postedBy: req.decoded._id, dishes: [req.body._id]}, function (err, favorite) {
                    if (err) throw err;

                    console.log('A new list of favorites has been created!');
                    return res.json(favorite);
                });
            }
            else {
                // for (var i = 0; i < doc.dishes.length; i++) {
                //     //The type for doc.dishes[i] is ObjectId, while String for req.body._id
                //     //if using ===, the value of this expression will always be false!!!!
                //     if (doc.dishes[i] == req.body._id) {
                //         return res.status(200).end("This dish has been added into the favorite list!");
                //     }
                // }
                if(doc.dishes.indexOf(req.body._id) != -1)
                    return res.status(200).end("This dish has been added into the favorite list!");

                doc.dishes.push(req.body._id);
                doc.save(function (err, result) {
                    res.json(result);
                });

            }
        })
    })
    .delete(function (req, res, next) {
        Favorites.findOne({postedBy: req.decoded._id}, function (err, doc) {
            if(err) throw err;

            doc.dishes = [];

            doc.save(function (err, doc) {
                if(err) throw err;

                res.json(doc);
            })
        })
    });

favoritesRouter.delete('/:dishId', verify.verifyOrdinaryUser, function (req, res, next) {
   Favorites.findOne({postedBy: req.decoded._id}, function (err, doc) {
       console.log(doc); //debug!!!!

       if(err) throw err;

       var newDishes = [];
       doc.dishes.forEach(function (item, index, arr) {
          if(item != req.params.dishId) newDishes.push(item);
       });
       doc.dishes = newDishes;

       console.log(doc.dishes); //debug!

       doc.save(function (err, doc) {
           if(err) throw err;
           res.json(doc);
       })
   })
});

module.exports = favoritesRouter;