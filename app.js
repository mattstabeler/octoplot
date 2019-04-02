require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');

var index = require('./routes/index');
var api = require('./routes/api');

var app = express();

const services = require('./services/services');
// let services = new Services();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const Octopus = require('./services/octopus.service');

services.add('octopus', new Octopus(process.env.SK, process.env.MPAN, process.env.ESERIAL, process.env.MPRN, process.env.GSERIAL));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/moment', express.static('node_modules/moment'));
app.use('/chart.js', express.static('node_modules/chart.js/dist'));

app.use('/', index);
app.use('/api/v1', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {


  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
