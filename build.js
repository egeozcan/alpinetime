var webpack = require("webpack");
var path = require('path');
var colors = require('colors');
var compiler = webpack({
  entry: "./client/js/main.js",
  output: {
    path: path.resolve('./public/js'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
});

compiler.watch(200, function(err, stats) {
  if(!!err) {
    console.log(err);
    console.log("Fail :(".red);
    return;
  }
  console.log(stats);
  console.log("---");
  if (stats.compilation.errors.length) {
    console.log(stats.compilation.errors);
    console.log("Fail :(".red);
  } else {
    console.log("Success!".green);
  }
});