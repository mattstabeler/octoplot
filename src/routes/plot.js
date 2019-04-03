const express = require('express');
const moment = require('moment-timezone');

const services = require('../services/services');
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  const dataService = services.get('data');


  let eData = await dataService.electricConsumption();
  let gData = await dataService.gasConsumption();

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
