var webpack = require("webpack");
var compiler = webpack(require('./webpack.config.js'));

compiler.watch(200, require('./webpack.log.js'));