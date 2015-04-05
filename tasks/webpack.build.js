var webpack = require("webpack");
var compiler = webpack(require('./webpack.config.js'));

compiler.run(require('./webpack.log.js'));