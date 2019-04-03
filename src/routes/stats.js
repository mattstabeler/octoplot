const express = require('express');
const router = express.Router();
const services = require('../services/services');

router.get('/stats', async (req, res, next) => {
  const dataService = services.get('data');

  let eData = await dataService.electricConsumption();
  let gData = await dataService.gasConsumption();

  res.render('stats', {data: { eData, gData }})
})

module.exports = router;
