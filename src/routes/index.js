const express = require('express');
const router = express.Router();
const path = require('path');
// const favicon = require('serve-favicon');


const plot = require('./plot')
const stats = require('./stats')
const api = require('./api')

router.use(express.static(path.join(__dirname, '../../public')));
router.use('/moment-timezone', express.static(path.join(__dirname, '../../node_modules/moment-timezone')));
router.use('/moment', express.static(path.join(__dirname, '../../node_modules/moment')));
router.use('/chart.js', express.static(path.join(__dirname, '../../node_modules/chart.js/dist')));

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));



router.use('/api/v1', api)
router.use(plot)
router.use(stats)


// catch 404 and forward to error handler
router.use(function(req, res, next) {

  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
router.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = router;
