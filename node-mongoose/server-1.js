var mongoose = require('mongoose'),   //mongoose ODM
    assert = require('assert');

var Dishes = require('./models/dishes-1.js');

//Connect URL
var URL = 'mongodb://localhost:27017/conFusion';
mongoose.connect(URL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection: error:'));
db.once('open', function () {
    //we're connected!
    console.log('Connected correctly to server');

    //create a new dish
    var newDish = Dishes({
        name: 'Uthapizza',
        description: 'Test'
    });

    //Save the dish
    newDish.save(function (err) {
        if(err) throw err; //no try-catch block, so passed to NodeJS env
        console.log('Dish created!');

        //Get all the dishes
        //verify the result
        Dishes.find({}, function (err, dishes) {
            if(err) throw err;

            console.log(dishes);
            db.collection('dishes').drop(function () {
                db.close();
            })
        })
    })
});
