/**
 * Created by taowang on 12/6/2016.
 */
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config');

exports.getToken = function (user) {
    //jwt.sign(payload, secretOrPrivateKey, options, [callback])
    //(Asynchronous) If a callback is supplied, callback is called with the err or the JWT.
    //(Synchronous) Returns the JsonWebToken as string
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600 //in seconds, which means this token will expire in one hour!!!!!
    })
};

exports.verifyOrdinaryUser = function (req, res, next) {
    //check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    //decode token
    if (token) {
        //verifies secret and checks exp
        jwt.verify(token, config.secretKey, function (err, decoded) {
            //decoded is the decoded payload!!!!!!!!!!
            // console.log(decoded); indicates user info, that is user document, in the _doc field!!!!!!!!!!!!!
            if (err) {
                var err = new Error('You are not authenticated');
                err.status = 401;
                return next(err);
            }
            else {
                //if everything is good, save to request for use in other routes
                req.decoded = decoded;   //add a new property/attribute/field "decoded" to request object
                next();           //request and response objects share with all of the route middlewares!!!!!!!!!!!!!!!!!
            }
        })
    }
    else {
        //if there is no token
        //return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};

exports.verifyAdmin = function (req, res, next) {
    if(req.decoded.admin) return next();
    else {
        var err = new Error("You are not authorized to perform this operation!");
        err.status = 403;
        return next(err);
    }
};