require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const lessMiddleware = require('less-middleware');
const path = require('path');



const services = require('./src/services/services');
const routes = require('./src/routes');

let app = express();


// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');

const Octopus = require('./src/services/octopus.service');
const DataService = require('./src/services/data.service');

services.add('octopus', new Octopus(process.env.SK, process.env.MPAN, process.env.ESERIAL, process.env.MPRN, process.env.GSERIAL));
services.add('data', new DataService(services.get('octopus')));

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));

app.use(routes);


module.exports = app;
