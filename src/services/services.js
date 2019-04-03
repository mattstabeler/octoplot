const Octopus = require('./octopus.service');

class Services {
  constructor(){
    this.services = {}
  }

  add(serviceName, service){

    console.log(`registered ${serviceName}`)
    this.services[serviceName] = service;
    // this[serviceName] = service;
  }

  get(serviceName) {
    return this.services[serviceName];
  }

}


module.exports = new Services();
module.exports.Services = Services;
