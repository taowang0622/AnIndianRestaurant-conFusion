/**
 * Created by taowang on 12/2/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    userName: String,
    password: String,
    OauthId: String,
    OauthToken: String,
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(passportLocalMongoose);

userSchema.methods.getName = function () {
    //Keep in mind it's the instance of the model corresponding to this schema using this method
    //so this refers to the document
    return (this.firstname + '' + this.lastname);
};

module.exports = mongoose.model('User', userSchema);