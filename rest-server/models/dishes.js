/**
 * Created by taowang on 11/29/2016.
 */
var mongoose = require('mongoose');
Schema = mongoose.Schema;

// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

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
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User' //ODM===>Model represents collection
    }
}, {timestamps: true}); //The comment date can be generated automatically, no need to do that manually

var dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    comments: [commentSchema]    //It is not required!!!!!!!!!
}, {timestamps: true});

var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;