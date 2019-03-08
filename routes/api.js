var express = require('express');
var router = express.Router();

const request = require('request-promise');


const services = require('../services/services');


router.get('/electricity-meter-points-mock', async (req, res) => {
  const data = require('../public/data.json');
  res.json(data);
});

router.get('/electricity-meter-points', async (req, res) => {
  let octopus = services.get('octopus');
  try {
    let data = await octopus.electricConsumption();
    res.json(data);
  }catch(err) {
    console.log(err);
    throw err;
  }

});

router.get('/gas-meter-points', async (req, res) => {
  let octopus = services.get('octopus');
  try {
    let data = await octopus.gasConsumption();
    res.json(data);
  }catch(err) {
    console.log(err);
    throw err;
  }


});


module.exports = router;
