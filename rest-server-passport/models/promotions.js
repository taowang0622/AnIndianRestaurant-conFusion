/**
 * Created by taowang on 11/29/2016.
 */
var mongoose = require('mongoose');
Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var promotionSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        image:{
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
        }
    },
    {timestamps: true}
);

var Promotions = mongoose.model('Promotion', promotionSchema);

module.exports = Promotions;