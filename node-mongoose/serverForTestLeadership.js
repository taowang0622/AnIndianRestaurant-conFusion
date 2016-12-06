/**
 * Created by taowang on 11/29/2016.
 */
var mongoose = require('mongoose'),
    assert = require('assert');

//Introduce a model
var Leaders = require('./models/leadership');

var URL = 'mongodb://localhost:27017/conFusion';

mongoose.connect(URL);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection: error'));
db.once('open', function () {
    console.log('Connected correctly');

    Leaders.create({
        "name": "Peter Pan",
        "image": "images/alberto.png",
        "designation": "Chief Epicurious Officer",
        "abbr": "CEO",
        "description": "Our CEO, Peter, . . ."
    }, function (err, leader) {
        if(err) throw err;

        console.log('Leader created!');
        console.log(leader);

        Leaders.find({}, function (err, leaders) {
            if(err) throw err;

            console.log(leaders);

            db.collection('leaders').drop(function () {
                db.close();
            })
        })
    })
});