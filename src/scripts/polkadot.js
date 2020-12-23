const Api = require('@polkadot/api');
const extension = require('@polkadot/extension-dapp');

const { ApiPromise, WsProvider } = Api;
const {
  web3Accounts,
  web3Enable,
  web3FromAddress,
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

  async getAccountsFromExtension() {
    // returns an array of all the injected sources
    // (this needs to be called first, before other requests)
    const extensions = await web3Enable('my cool dapp');

    if (extensions.length === 0) {
      // no extension installed, or the user did not accept the authorization
      // in this case we should inform the use and give a link to the extension
      return;
    }
    const allAccounts = await web3Accounts();
    console.log(allAccounts);
    return allAccounts;
    // returns an array of { address, meta: { name, source } }
    // meta.source contains the name of the extension that provides this account
    // const allAccounts = await web3Accounts();

    // the address we use to use for signing, as injected
    // const SENDER = '5DTestUPts3kjeXSTMyerHihn1uwMfLj8vU8sqF7qYrFabHE';

    // finds an injector for an address
    // const injector = await web3FromAddress(SENDER);
    
    // this.api.tx.nominate
  }

  async getAccountInfo(addr) {
    const accountInfo = await this.api.query.system.account(addr);
    return accountInfo;
  }

  async bond(account, addr, balance) {
    const extrinsic = await this.api.tx.staking.bond(addr, balance, addr);
    return this._signAndSend(account,extrinsic);
  }

  async _signAndSend(account, extrinsic) {
    // to be able to retrieve the signer interface from this account
    // we can use web3FromSource which will return an InjectedExtension type
    const injector = await web3FromAddress(account.address);

    // passing the injected account address as the first argument of signAndSend
    // will allow the api to retrieve the signer and the user will see the extension
    // popup asking to sign the balance transfer transaction
    const promise = new Promise((resolve, reject)=>{
      extrinsic.signAndSend(account.address, { signer: injector.signer }, ({ status }) => {
        if (status.isInBlock) {
          console.log(`Completed at block hash #${status.asInBlock.toString()}`);
          resolve();
        } else {
          console.log(`Current status: ${status.type}`);
        }
      }).catch((error) => {
        console.log(':( transaction failed', error);
        reject(error);
      });
    });
    return promise;
  }

  async bondExtra(account, balance) {
    const extrinsic = await this.api.tx.staking.bondExtra(balance);

    return this._signAndSend(account, extrinsic);
  }

  async nominate(account, nominees) {
    const extrinsic = await this.api.tx.staking.nominate(nominees);
    return this._signAndSend(account, extrinsic);
  }
}

const polkadot = new Polkadot();

module.exports = polkadot;