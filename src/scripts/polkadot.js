const Api = require('@polkadot/api');

const { ApiPromise, WsProvider } = Api;

class Polkadot {
  constructor() {
    this.addrs = ['H4EeouHL5LawTqq2itu6auF62hDRX2LEBYk1TxS6QMrn9Hg'];
  }

  async connect() {
    const wsProvider = new WsProvider('wss://kusama-rpc.polkadot.io');
    this.api = await ApiPromise.create({ provider: wsProvider });
  }

  async retrieveValidators() {
    const response = [];
    for(let i = 0; i < this.addrs.length; i++) {
      const res = await this.api.query.identity.identityOf(this.addrs[i]);
      const info = {
        addr: this.addrs[i],
        displayName: new TextDecoder().decode(res.value.info.display.value),
      };
      response.push(info);
    }
    return response;
  }
}

const polkadot = new Polkadot();

module.exports = polkadot;