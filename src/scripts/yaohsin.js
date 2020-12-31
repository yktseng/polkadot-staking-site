const axios = require('axios');

class Yaohsin {
  constructor() {
  }

  async getOneKVList(params) {
    if(params === 'undefined') {
      params = {};
      params.rate = 100;
    }
    const result = await axios.get(`https://kusama.yaohsin.net/api/onekvlist?rate=${params.rate}`);
    return result;
  }

  getRandomValidators(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  async getCurrentNominatingStatus() {
    const result = await axios.get(`https://kusama.yaohsin.net/api/nominators`);
    return result;
  }
  
  mergeOneKVListAndNominatingStatus(onekv, nominatorStats) {
    const nominators = nominatorStats.nominators;
    nominators.forEach(element => {
      const current = element.current;
      const stashAddr = element.address;
      current.forEach(target => {
        onekv.forEach(validator => {
          if(target.stash === validator.stash) {
            validator.nominator = stashAddr;
            validator.elected = target.elected;
          }
        });
      });
    });
    return onekv;
  }

}

module.exports = Yaohsin;
