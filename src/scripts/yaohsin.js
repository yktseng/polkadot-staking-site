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
    if(result.status === 200) {
      return result.data;
    } else {
      throw new Error('Failed to retrieve data: ' + result.status);
    }
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
    if(result.status === 200) {
      return result.data;
    } else {
      throw new Error('Failed to retrieve data: ' + result.status);
    }
  }
  
  mergeOneKVList(onekv, detailInfo) {
    onekv.forEach(element => {
      const name = element.name;
      detailInfo.forEach(detail => {
        if(detail.stakingInfo !== undefined && detail.stakingInfo !== null) {
          if(detail.name === name) {
            element.electedRate = detail.electedRate;
            if(detail.stakingInfo.stakingLedger !== undefined) {
              element.stakeSize = detail.stakingInfo.stakingLedger.total;
              element.totalNominators = detail.totalNominators;
              element.activeNominators = detail.activeNominators;
            }
          }
        }
      });
    });
    return onekv;
  }
  
  async getOneKVInfo() {
    const result = await axios.get(`https://kusama.yaohsin.net/api/valid`);
    if(result.status === 200) {
      result.data.valid.map((v)=>{
        if(v.electedRate === undefined) {
          v.electedRate = 0;
        }
      });
      return result.data;
    } else {
      throw new Error('Failed to retrieve data: ' + result.status);
    }
  }

  getOneKVDetailedInfo() {
    return axios.get(`https://kusama.yaohsin.net/api/validDetail`).then((result)=>{
      if(result.status === 200) {
        return result.data;
      } else {
        throw new Error('Failed to retrieve data: ' + result.status);
      }
    });
  }
}

module.exports = Yaohsin;
