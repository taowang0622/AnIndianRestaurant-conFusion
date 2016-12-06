/**
 * Created by taowang on 11/29/2016.
 */
var mongoose = require('mongoose'),
    assert = require('assert');

//Introduce a model
var Promotions = require('./models/promotions');

var URL = 'mongodb://localhost:27017/conFusion';

mongoose.connect(URL);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection: error'));
db.once('open', function () {
    console.log('Connected correctly');

    Promotions.create({
        "name": "Weekend Grand Buffet",
        "image": "images/buffet.png",
        "price": "19.99",
        "description": "Featuring . . ."
    }, function (err, promotion) {
        if(err) throw err;

        console.log('Promotion created!');
        console.log(promotion);

        Promotions.find({}, function (err, promotions) {
            if(err) throw err;

            console.log(promotions);

            db.collection('promotions').drop(function () {
                db.close();
            })
        })
    })
});