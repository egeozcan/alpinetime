var path = require("path");
//parser
var parse = require('co-body');
//Koa and middleware
var koa = require("koa");
var route = require('koa-route');
var logger = require('koa-logger');
var session = require('koa-session');

var config = require('./config');
var app = koa();

app.keys = [config.app.secret];

app.use(logger);
app.use(session(app));

var viewCounterMiddleware = require('./middleware/ViewCounterMiddleware');
app.use(viewCounterMiddleware);

var setUserObjectMiddleware = require('./middleware/SetUserObjectMiddleware');
app.use(setUserObjectMiddleware);

//Check the status for 401 and rewrite body as the appropriate error message
var authFailedHandlerMiddleware = require('./middleware/AuthFailedHandlerMiddleware');
app.use(authFailedHandlerMiddleware);

// Middleware below this line is only reached if JWT token is valid
//app.use(jwt({ secret: config.app.secret }));

var projectController = require('./controllers/ProjectController');
app.use(route.get('/projects', projectController.list));


export default app;