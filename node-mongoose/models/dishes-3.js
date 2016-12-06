/**
 * Created by taowang on 11/29/2016.
 */
var mongoose = require('mongoose');
Schema = mongoose.Schema;

//create a schema
var commentSchema = new Schema({
    rating: {
        type: Number,
        max: 5,
        min: 1,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {timestamp: true}); //The comment date can be generated automatically, no need to do that manually

// create a schema
var dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [commentSchema] //[] indicates array!!!!!!!!!!!!!!
}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Dishes = mongoose.model('Dish', dishSchema);

// make this available to our Node applications
module.exports = Dishes;