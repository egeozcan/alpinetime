require("babel/register")({
    ignore: false
});

require('./server').listen(8080);