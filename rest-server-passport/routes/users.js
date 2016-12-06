var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');

/* GET users listing. */
router.get('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  // res.send('respond with a resource');  //res.send([body])
    User.find({}).exec(function (err, docs) {
        if(err) throw new Error('can not retrieve users listing');
        res.json(docs);
    })
});

router.post('/register', function (req, res, next) {
    //User.register() is a static method for constructor User!!!!!
    //register(user, password, cb) Convenience method to register a new user instance with a given password. Checks if username is unique
    User.register(new User({username: req.body.username, admin:req.body.admin}),
        req.body.password, function (err, user) {
            if(err){
                return res.status(500).json({err: err});
            }
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({status: 'Registration Successful'});
            })
        })
});

router.post('/login', function (req, res, next) {
   passport.authenticate('local', function (err, user, info) {
       if(err) return next(err);
       if(!user){
           return res.status(401).json({err: info});
       }
       console.log(user);
       req.logIn(user, function (err) {
           if(err){
               return res.status(500).json({
                   err: 'Could not log in user'
               })
           }

           var token = Verify.getToken(user);
           res.status(200).json({
               status: 'Login successful!',
               success: true,
               token: token
           });
       });
   })(req, res, next);  //passport.authenticate() returns a function object, so need to use() to execute this function object!!!!
});

router.get('/logout', function (req, res, next) {
   req.logout();
   res.status(200).json({
       status: 'Bye!'
   })
});


module.exports = router;
