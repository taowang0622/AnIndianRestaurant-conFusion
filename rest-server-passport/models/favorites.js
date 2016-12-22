/**
 * Created by taowang on 12/13/2016.
 */
var mongoose = require('mongoose');
Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User' //population
    },
    dishes: [{type: Schema.Types.ObjectId, ref: 'Dish'}] //population
}, {timestamps: true});

module.exports = mongoose.model('Favorite', favoriteSchema);