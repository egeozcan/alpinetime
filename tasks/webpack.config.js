var path = require("path");

var outputPath = path.resolve(__dirname, "../public/js");
console.log(outputPath);
const settings = {
  entry: "./client/js/main.js",
  devtool: "source-map",
  output: {
    path: outputPath,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          // https://github.com/babel/babel-loader#options
          presets: ["react", "es2015", "stage-0"],
          plugins: ["lodash"]
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader"
      }
    ]
  }
};

module.exports = settings;