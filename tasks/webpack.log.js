"use strict";

require("colors");

const prefix = "[_JS] ";

module.exports = function(err, stats) {
    if(err) {
        console.log(prefix, err);
        console.log(prefix, "Fail :(".red);
        return;
    }
    if (stats.compilation.errors.length) {
        stats.compilation.errors.forEach(function (error) {
            console.log(error.error.toString().yellow);
            console.log(prefix, "Fail :(".red);
        });
    } else {
        console.log(prefix, "Success!".green);
    }
};