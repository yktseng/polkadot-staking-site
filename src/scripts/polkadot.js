const Api = require('@polkadot/api');
const extension = require('@polkadot/extension-dapp');

const { ApiPromise, WsProvider } = Api;
const {
  // web3Accounts,
  web3Enable,
  // web3FromAddress,
  // web3ListRpcProviders,
  // web3UseRpcProvider
} = extension;

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

  async nominate() {
    // returns an array of all the injected sources
    // (this needs to be called first, before other requests)
    const extensions = await web3Enable('my cool dapp');

    if (extensions.length === 0) {
      // no extension installed, or the user did not accept the authorization
      // in this case we should inform the use and give a link to the extension
      return;
    }
  
    // returns an array of { address, meta: { name, source } }
    // meta.source contains the name of the extension that provides this account
    // const allAccounts = await web3Accounts();

    // the address we use to use for signing, as injected
    // const SENDER = '5DTestUPts3kjeXSTMyerHihn1uwMfLj8vU8sqF7qYrFabHE';

    // finds an injector for an address
    // const injector = await web3FromAddress(SENDER);
    
    // this.api.tx.nominate
  }
}

const polkadot = new Polkadot();

module.exports = polkadot;