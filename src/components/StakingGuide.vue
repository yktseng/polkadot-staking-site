 
  <template>
  <div id="staking-guide">
    <md-dialog :md-active.sync="showDialog" class="staking-guide">
      <md-dialog-title>Staking on Kusama</md-dialog-title>
      <md-steppers :md-active-step.sync="active" md-linear>
      
      <md-step id="first" md-label="A simple guide" :md-done.sync="first">
        <md-progress-bar md-mode="query" v-if="showProgressBar"></md-progress-bar>
        <p>1. You will see a list of validators which we hold, these are validators you are going to delegate</p>
        <p>2. The website will ask you to allow it to interact with your polkadot browser extension, select Yes to continue</p>
        <p>3. You can select how much fund you want to delegate to our validators</p>
        <p>4. The website will ask you to sign a batch of extrinsics to fulfill to transaction</p>
      </md-step>

      <md-step id="second" md-label="Choose validators" :md-done.sync="second">
        <span>We hold the following validators now</span>
        <md-list>
          <md-list-item class="validator-list-item" v-for="(validator, index) in validators" :key="index" value="validator.addr">
            <span class="md-list-item-text">{{validator.displayName}}</span>
            <span class="md-list-validator-addr">{{validator.addr}}</span>
          </md-list-item>
        </md-list>
        <p>Delegate your KSM to our validators!</p>
      </md-step>

      <md-step id="third" md-label="Bond your Stake" :md-done.sync="third">
        <!-- Ask polkadot extension about the identity of the nominator and the amount of its free funds -->
          <label>Your Kusama Accounts</label><br/>
          <!-- <md-field>
          <md-select v-model="selectedAddress" @change="onAddrChange($event)">
            <md-option v-for="account in accounts" :key="account.address" v-bind:value="account.address">{{account.address}}</md-option>
          </md-select>
          </md-field> -->
          <select v-model="selectedAddress" @change="onAddrChange($event)">
            <option v-for="account in accounts" :key="account.address" v-bind:value="account.address">{{account.address}}</option>
          </select>
          <br/>
        <p>Your free funds: {{freeFund}} KSM</p>
        Stake 
        <input type="range" v-model.number="stakeFund" :min="stakedFund" :max="maxFund" step="0.001"> {{ stakeFund }} KSM to us
      </md-step>

      <md-step id="fourth" md-label="See result" :md-done.sync="fourth">
        <md-progress-bar md-mode="query" v-if="showProgressBar"></md-progress-bar>
        <span>{{extrinsicStatus}}</span>
        <p v-if="extrinsicStatus === 'done!'">You can see the result in <a :href="polkascanUrl">polkascan.io/</a></p>
        <p v-if="extrinsicStatus === 'done!'">Happy delegating</p>
      </md-step>
    </md-steppers>
      <md-dialog-actions>
        <md-button class="md-raised md-primary" @click="setDone(nextStep())" :disabled="isLoading || ended">Continue</md-button>
        <md-button class="md-secondary" @click="$emit('close-guide')">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>

const polkadot = require('../scripts/polkadot');
export default {
  name: 'StakingGuide',
  props: {
    open: Boolean,
  },
  data: function() {
    return {
      showDialog: this.open,
      first: false,
      second: false,
      third: false,
      fourth: false,
      active: 'first',
      isLoading: false,
      validators: [],
      accounts: [],
      selectedAccount: undefined,
      selectedAddress: "",
      freeFund: 0,
      stakedFund: 0,
      stakeFund: 0,
      maxFund: 0,
      // step four
      showProgressBar: false,
      extrinsicStatus: "",
      blockHash: "",
      polkascanUrl: "",
      ended: false,
    }
  },
  created: async function() {
    this.isLoading = true;
    this.showProgressBar = true;
    await polkadot.connect();
    this.validators = await polkadot.retrieveValidators();
    this.isLoading = false;
    this.showProgressBar = false;
  },
  methods: {
    _calculateFunds(accountInfo) {
      console.log((accountInfo.data.free.toNumber() / 1000000000000).toFixed(3), (accountInfo.data.reserved.toNumber() / 1000000000000).toFixed(3), (accountInfo.data.feeFrozen.toNumber() / 1000000000000).toFixed(3), (accountInfo.data.miscFrozen.toNumber() / 1000000000000).toFixed(3));
          this.freeFund = ((accountInfo.data.free - accountInfo.data.feeFrozen) / 1000000000000).toFixed(3);
          this.stakedFund = (accountInfo.data.feeFrozen / 1000000000000).toFixed(3);
          this.stakeFund = this.stakedFund;
          this.maxFund = parseFloat(this.freeFund) + parseFloat(this.stakedFund); // minus 0.5 to make sure you have enough KSM to pay the fee
          if(this.maxFund < 0.5) {
            this.maxFund -= 0.2;
          } else {
            this.maxFund -= 0.5;
          }
    },
    async setDone (index) {
      if (index) {
        this.active = index
      }
      if (index === 'third') { // select a number of funds to bond
        this.accounts = await polkadot.getAccountsFromExtension();
        if(this.accounts !== undefined) {
          this.selectedAddress = this.accounts[0].address;
          this.selectedAccount = this.accounts[0];
          const accountInfo = await polkadot.getAccountInfo(this.selectedAddress);
          this._calculateFunds(accountInfo);
        }
      }
      if (index === 'fourth') {
        this.ended = true;
        // call bond() or bondExtra()
        this.showProgressBar = true;
        const tx = [];
        if(parseFloat(this.stakedFund) === 0) { // call bond()
          this.extrinsicStatus = "bonding..."
          try {
            tx.push(polkadot.getBondExtrinsic(this.selectedAddress, this.stakeFund));
            //await polkadot.bond(this.selectedAccount, this.selectedAccount.address, this.stakeFund);
          } catch(e) {
            this.extrinsicStatus = "failed to bond: " + e;
            this.showProgressBar = false;
            return;
          }
        } else if(parseFloat(this.stakeFund) - parseFloat(this.stakedFund) > 0) { // call bondExtra()
          this.extrinsicStatus = "bondingExtra..."
          try {
            tx.push(polkadot.getBondExtraExtrinsic(parseFloat(this.stakeFund) - parseFloat(this.stakedFund)));
            //await polkadot.bondExtra(this.selectedAccount, parseFloat(this.stakeFund) - parseFloat(this.stakedFund))
          } catch (e) {
            this.extrinsicStatus = "failed to bondExtra: " + e;
            this.showProgressBar = false;
            return;
          }
        }
        this.extrinsicStatus = "nominating..."
        // call nominate()
        try {
          tx.push(polkadot.getNominateExtrinsic(this.validators.map((v)=>{
           return v.addr;
          })));
          //const blockHash = await polkadot.nominate(this.selectedAccount, this.validators.map((v)=>{
          //  return v.addr;
          //}));
          const blockHash = await polkadot.batchSignAndSend(this.selectedAccount, tx);
          this.extrinsicStatus = "done!"
          this.blockHash = blockHash;
          await polkadot.getBlockInfo(blockHash);
          this.showProgressBar = false;
          this.polkascanUrl = `https://polkascan.io/kusama/block/${blockHash}`;
          

        } catch(e) {
          this.extrinsicStatus = "failed to nominate: " + e;
          this.showProgressBar = false;
          return;
        }
      }
    },
    async onAddrChange () {
      if(this.selectedAddress !== undefined) {
        const accountInfo = await polkadot.getAccountInfo(this.selectedAddress);
        this.selectedAccount = accountInfo;
        this._calculateFunds(accountInfo);
      }
    },
    nextStep () {
      switch(this.active) {
        case 'first':
          return 'second';
        case 'second':
          return 'third';
        case 'third':
          return 'fourth';
        case 'fourth':
          return 'fourth';
      }
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .md-list-item-text {
    font-size: 14px;
  }
  .md-list-validator-addr {
    font-size: 12px;
    text-align: right;
    color: gray;
  }
  .md-stepper-number{
    background-color: #0466C8 !important;
  }
  .validator-list-item {
    height: 24px;
  }
  .md-content {
    overflow: auto;
  }
</style>