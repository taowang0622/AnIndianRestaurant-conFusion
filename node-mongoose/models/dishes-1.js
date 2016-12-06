//Grab things we need
var mongoose = require('mongoose'),
    assert = require('assert');

var Schema = mongoose.Schema;  //mongoose.Schema returns a constructor

//create a schema
var dishSchema = new Schema({
    name : {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
}, {timestamps: true});

//Schema useless so far
//need to create a model using it
//The first argument is the singular name of the collection your model is for.
// Mongoose automatically looks for the plural version of your model name.
// Thus, for the example above, the model Dish is for the Dishes collection in the database.
var Dishes = mongoose.model('Dish', dishSchema);

//Make this available to my node application
module.exports = Dishes;