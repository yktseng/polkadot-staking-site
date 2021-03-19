const axios = require('axios');
const path = process.env.VUE_APP_BACKEND_PATH || 'http://127.0.0.1:3000';
console.log(`path = ${path}`);
class Yaohsin {
  constructor() {
  }

  async getOneKVOfficialNominators() {
    const result = await axios.get(`${path}/api/nominators`);
    if(result.status === 200) {
      return result.data;
    } else {
      throw new Error('Failed to retrieve data: ' + result.status);
    }
  }

  async getOneKVList(params) {
    if(params === 'undefined') {
      params = {};
      params.rate = 100;
    }
    const result = await axios.get(`${path}/api/onekvlist?rate=${params.rate}`);
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
    const result = await axios.get(`${path}/api/nominators`);
    if(result.status === 200) {
      return result.data;
    } else {
      throw new Error('Failed to retrieve data: ' + result.status);
    }
  }
  
  mergeOneKVList(onekv, detailInfo, oneKVNominators) {
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
            element.oneKVNominated = false;
            // find matched 1kv nominator
            const validator = detail.stash;
            for(let j = 0; j < oneKVNominators.length; j++) {
              const oneKV = oneKVNominators[j];
              for(let k = 0; k < oneKV.current.length; k++) {
                if(oneKV.current[k].stash === validator) {
                  console.log(
                    'onekv'
                  );
                  element.oneKVNominated = true;
                  break;
                }
              }
              if(element.oneKVNominated === true) {
                break;
              }
            }
          }
        }
      });
    });
    return onekv;
  }
  
  async getOneKVInfo() {
    const result = await axios.get(`${path}/api/valid`);
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

  getOneKVDetailedInfo(params) {
    if(params === undefined) {
      params = {
        ignoredValidators: [],
      };
    }
    return axios.get(`${path}/api/validDetail?option=1kv`).then((result)=>{
      if(result.status === 200) {
        if(params.electedRate > 0) {
          result.data.valid = result.data.valid.reduce((acc, v) => {
            if(v.electedRate < params.electedRate) {
              acc.push(v);
            }
            return acc;
          }, []);
        }
        if(params.totalNominators > 0) {
          result.data.valid = result.data.valid.reduce((acc, v) => {
            if(v.totalNominators < params.totalNominators) {
              acc.push(v);
            }
            return acc;
          }, []);
        }
        if(params.ignoredValidators.length > 0) {
          result.data.valid = result.data.valid.reduce((acc, v) => {
            if(v.stakingInfo !== undefined && v.stakingInfo !== null) {
              if(!params.ignoredValidators.includes(v.stakingInfo.accountId)) {
                acc.push(v);
              }
            }
            return acc;
          }, []);
        }
        result.data.valid = result.data.valid.reduce((acc, v) => {
          if(v.invalidityReasons === '') {
            acc.push(v);
          }
          return acc;
        }, []);
        return result.data;
      } else {
        throw new Error('Failed to retrieve data: ' + result.status);
      }
    });
  }

  async getValidatorStatus(stash) {
    return axios.get(`${path}/api/validator/${stash}/trend`).then((result)=>{
      return result;
    });
  }

  async getAllValidatorAndNominators() {
    return axios.get(`${path}/api/allValidators?size=1500`).then((result)=>{
      return result.data;
    });
  }

  async getNominatorBalances(nominators) {
    const clone = [...nominators];
    let arrays = [clone];
    if(clone.length > 30) {
      arrays = this.__splitNominatorArray(clone);
    }
    let results = [];
    for(let i = 0; i < arrays.length; i++) {
      const data = JSON.stringify(arrays[i]);
      const tmp = await axios.get(`${path}/api/nominators/${data}/stakingInfo`).then((result)=>{
        return result.data;
      });
      results = results.concat(tmp);
    }
    return results;
  }

  __splitNominatorArray(array) {
    let result = [];
    const parts = 4;
    for (let i = parts; i > 0; i--) {
        result.push(array.splice(0, Math.ceil(array.length / i)));
    }
    return result;
  }
}

module.exports = Yaohsin;
