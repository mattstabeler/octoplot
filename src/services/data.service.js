
class DataService {

  constructor(octopus) {
    this.octopus = octopus;
  }

  async gasConsumption() {
    let gData;
    if(process.env.NODE_ENV == 'production'){
      gData = await this.octopus.gasConsumption();
    } else {
      gData = require('../../public/gData')
    }
    return gData;
  }

  async electricConsumption() {
    let eData;
    if(process.env.NODE_ENV == 'production'){
      eData = await this.octopus.electricConsumption();
    } else {
      eData = require('../../public/eData')
    }

    return eData

  }

}


module.exports = DataService;
