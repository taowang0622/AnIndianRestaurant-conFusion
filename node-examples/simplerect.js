/**
 * Created by taowang on 11/18/2016.
 */
var rect = {
    perimeter: function (x, y) {
        return 2 * (x + y);
    },
    area:function (x, y) {
        return x * y;
    }
};

function solveRect(l, b) {
    console.log('solve for rectangle with l = ' + l + " b = " + b);

    if(l < 0 || b < 0){
        console.log('Rectangle dimensions should be greater than l = ' + l + ' b = ' + b);
    }
    else{
        console.log("The area of a rectangle with l = " + l + ' b = ' + b + ' is ' +rect.area(l, b));
        console.log("The perimeter of a rectangle with l = " + l + ' b = ' + b + ' is ' + rect.perimeter(l, b));
    }

}

solveRect(2, 2);
solveRect(2, 3);
solveRect(-1, 2);