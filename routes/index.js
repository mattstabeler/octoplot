const express = require('express');
const router = express.Router();
const moment = require('moment-timezone')
const request = require('request-promise');
const services = require('../services/services');
/* GET home page. */
router.get('/', async (req, res, next) => {


  let eData = await services.get('octopus').electricConsumption();
  let gData = await services.get('octopus').gasConsumption();


  // let eData = require('../public/eData')
  // let gData = require('../public/gData')
  // console.log(data);



  eData.results.reverse()
  gData.results.reverse()

  let eDataKeys = eData.results.map((item) => { return moment(item.interval_start).format() });
  let eDataItems = eData.results.map((item) => { return item.consumption });

  // let keys = data.results.keys();
  let gDataKeys = gData.results.map((item) => { return moment(item.interval_start).format() });
  let gDataItems = gData.results.map((item) => { return item.consumption });

  // let dataColour = data.results.map((item) => { return item.consumption });
  let plotData = { gKeys: gDataKeys, gData: gDataItems, eKeys: eDataKeys, eData: eDataItems};

  // console.log(plotData);

  res.render('index', { title: 'Consumption in kWH', plot: plotData });
});

module.exports = router;
