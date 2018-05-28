var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');

/* GET users listing. */
router.get('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    // res.send('respond with a resource');  //res.send([body])
    User.find({}).exec(function (err, docs) {
        if (err) throw new Error('can not retrieve users listing');
        res.json(docs);
    })
});

router.post('/register', function (req, res, next) {
    //User.register() is a static method for constructor User!!!!!
    //register(user, password, cb) Convenience method to register a new user instance with a given password. Checks if username is unique
    User.register(new User({
            username: req.body.username,
            admin: req.body.admin,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }),
        req.body.password, function (err, user) {
            if (err) {
                return res.status(500).json({err: err});
            }
            //Note: passport.authenticate() middleware invokes req.login() automatically.
            // This function is primarily used when users sign up, during which req.login() can be invoked to automatically log in the newly registered user.
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({status: 'Registration Successful'});
            })
        })
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) return next(err);
        if (!user) {
            return res.status(401).json({err: info});
        }

        //Passport exposes a function logIn() on req object that can be used to establish "a login session"!!!
        //when login operation completed, user will be assigned to "req.user"!!!!!!!!!!!!
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                })
            }

            // console.log(user);
            // console.log(user.constructor);======>The type of user is not Object!!!
            //MongoDB stores documents in BSON format!!
            //No need to encapsulate all the info into JWT
            //just username, _id, and admin
            var token = Verify.getToken({"username": user.username, "_id": user._id, "admin": user.admin});
            res.status(200).json({
                status: 'Login successful!',
                success: true,
                token: token
            });
        });
    })(req, res, next);  //passport.authenticate() returns a function object, so need to use() to execute this function object!!!!
});

router.get('/logout', function (req, res, next) {
    //Passport exposes a function logOut() on the req object
    //Invoking logOut() will remove the property "req.user" and clear "the login session"!!!!
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    })
});

//passport.authenticate(..) returns a function object which takes three parameters-req, res and next!!!!!!!!!!!!!!!!
router.get('/facebook', passport.authenticate('facebook'), function (req, res, next) {
});

router.get('/facebook/callback', function (req, res, next) {
    //function(err, user, info)====>callback "done" in authenticate.js
    passport.authenticate('facebook', function (err, user, info) {
        if (err) return next(err);

        if (!user) {
            return res.status(401).json({
                err: info
            })
        }

        //req.logIn() is part of passport package, and it is for building a session for persistent login!!!!!
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                })
            }
            var token = Verify.getToken(user);
            res.status(200).json({
                status: 'Login successful!',
                success: true,
                token: token
            })
        })
    })(req, res, next);
});


module.exports = router;
