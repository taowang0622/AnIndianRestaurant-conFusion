/**
 * Created by taowang on 11/18/2016.
 */
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

solveRect(2, 4);
solveRect(3, 5);
solveRect(-3, 5);