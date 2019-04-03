const request = require('request-promise');

class Octopus {

  constructor(sk, mpan, eserial, mprn, gserial) {
    this.sk = sk; // like sk_live_xxxxxx
    this.MPAN = mpan;
    this.MPRN = mprn;
    this.ESERIAL = eserial;
    this.GSERIAL = gserial;
  }

  async electricConsumption(page = 1){
    return this._getData(`https://api.octopus.energy/v1/electricity-meter-points/${this.MPAN}/meters/${this.ESERIAL}/consumption/?page=${page}`)
  }
  async gasConsumption(page = 1){
    return this._getData(`https://api.octopus.energy/v1/gas-meter-points/${this.MPRN}/meters/${this.GSERIAL}/consumption/?page=${page}`)
  }

  async _getData(uri) {
    let options = {
       // uri: `http://localhost:3000/data.json`,
       uri: uri,
       auth: {
          'user': this.sk,
          // 'pass': 'mypassword',
          'sendImmediately': false
        }
    }
    console.log(`getting ${options.uri}`);

    let data = await request(options).catch(err => {
      throw(err);
    });

    data = JSON.parse(data);
    return data;
  }


}


module.exports = Octopus;
