/**
 * Created by taowang on 11/29/2016.
 */
var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes-1');

var URL = 'mongodb://localhost:27017/conFusion'; //mongodb is just a server to restore collections
mongoose.connect(URL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    //we're connected
    console.log('Connected correctly to server');

    //create a new dish
    Dishes.create({
        name: 'Uthapizza',
        description: 'Test'
    }, function (err, dish) {
        if(err) throw err;
        console.log('Dish created!');
        console.log(dish);

        var id = dish._id; //for query!!!!!!

        //Get all the dishes
        setTimeout(function () {
            Dishes.findByIdAndUpdate(id, {$set:
                {description: 'Updated Test'}}, {new: true})  //new: bool - true to return the modified document rather than the original. defaults to false
                .exec(function (err, dish) {
                    if(err) throw err;
                    console.log('Updated Dish!!');
                    console.log(dish);

                    db.collection('dishes').drop(function () {
                        db.close();
                    })
                }, 3000);
        })
    })
});