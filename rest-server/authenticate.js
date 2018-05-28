var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy; //LocalStrategy is a constructor function object!
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('./models/user');
var config = require('./config');

// use static authenticate method of model in LocalStrategy
exports.local = passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());  //in order for persistent sessions to work!!!!
passport.deserializeUser(User.deserializeUser());

exports.facebook = passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
}, function (accessToken, refreshToken, profile, done) {
    User.findOne({OauthId: profile.id}, function (err, user) {
        if(err) console.log(err); //handle errors!
        if(!err && user !== null){
            done(null, user);
        }
        else{
            user = new User({
                username: profile.displayName
            });
            user.OauthId = profile.id;
            user.OauthToken = accessToken;
            //ODM where M can stand for mapping or model, when model changing, use save() to map to database
            user.save(function (err) {
                if(err) console.log("saving user ....");
                done(null, user);
            })
        }
    })
    }
));