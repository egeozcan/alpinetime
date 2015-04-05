var path = require('path');

var outputPath = path.resolve('./public/js');
console.log(outputPath);
module.exports = {
  entry: "./client/js/main.js",
  output: {
    path: outputPath,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}