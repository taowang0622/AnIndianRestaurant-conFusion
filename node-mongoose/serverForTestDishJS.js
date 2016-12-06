/**
 * Created by taowang on 11/29/2016.
 */
var mongoose = require('mongoose'),
    assert = require('assert');

//Introduce a model 
var Dishes = require('./models/dishes');

var URL = 'mongodb://localhost:27017/conFusion';

mongoose.connect(URL);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection: error'));
db.once('open', function () {
    console.log('Connected correctly');
    
    Dishes.create({
        "name": "Uthapizza",
        "image": "images/uthapizza.png",
        "category": "mains",
        "price": "4.99",
        "description": "A unique . . .",
        "comments": [
            {
                "rating": 5,
                "comment": "Imagine all the eatables, living in conFusion!",
                "author": "John Lemon"
            },
            {
                "rating": 4,
                "comment": "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
                "author": "Paul McVites"
            }
        ]
    }, function (err, dish) {
        if(err) throw err;

        console.log('Dish created!');
        console.log(dish);

        Dishes.find({}, function (err, dishes) {
            if(err) throw err;

            console.log(dishes);

            db.collection('dishes').drop(function () {
                db.close();
            })
        })
    })
});