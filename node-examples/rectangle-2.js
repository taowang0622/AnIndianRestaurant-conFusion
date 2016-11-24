/**
 * Created by taowang on 11/18/2016.
 */
module.exports = function (l, b, callback) {
  try{
      if(l < 0 || b < 0)
          throw new Error('Rectangle dimensions should be greater than l = ' + l + ' b = ' + b);
      else{
          callback(null, {
              perimeter : function () {
                  return 2 * (l + b);
              },
              area : function () {
                  return (l * b)
              }
          })
      }
  }catch (error){
      callback(error, null)
  }
};