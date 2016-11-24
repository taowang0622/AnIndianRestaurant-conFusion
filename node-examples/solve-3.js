/**
 * Created by taowang on 11/18/2016.
 */
var argv = require('yargs')
    .usage('Usage: node $0 --l=[num] --b=[num]') //$0 represents the JS script we are gonna pass
    .demand(['l', 'b'])
    .argv;  //argv is just a plain JS object with two attributes l and b

var rect = require('./rectangle-2');

function solveRect(l, b) {
    console.log("Solving for rectangle with l = "
        + l + " and b = " + b);

    rect(l, b, function (err, cal) {
        if (err) {
            console.log(err);
        }
        else {
            // TODO refer to l and b in this function body----->Use a function which l and b are passed to for wrapping this callback function
            console.log('The area of a rectangle  is ' + cal.area());
            console.log('The perimeter of a rectangle is ' + cal.perimeter());
        }
    })
}

//This indicates argv is just a JS object!!!!
solveRect(argv.l, argv.b);