require("6to5/register")({
    ignore: false
});

require('./server').listen(8080);