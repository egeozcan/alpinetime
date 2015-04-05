var colors = require('colors');

module.exports = function(err, stats) {
  if(!!err) {
    console.log("[_JS] ", err);
    console.log("[_JS] ", "Fail :(".red);
    return;
  }
  if (stats.compilation.errors.length) {
    stats.compilation.errors.forEach(function (error) {
      console.log(error.error.toString().yellow);
      console.log("[_JS] ", "Fail :(".red);
    });
  } else {
    console.log("[_JS] ", "Success!".green);
  }
}