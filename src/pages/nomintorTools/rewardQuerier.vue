<template>
<div id="reward-querier">
  <md-toolbar>
      <div class="md-toolbar-row">
      <div class='md-toolbar-section-start search-bar '> 
        <md-icon id="search-icon">search</md-icon>
        <md-field>
          <md-autocomplete md-input-placeholder="Search for Stash ID" v-model="selectedStash" :md-options="historicalQuery"></md-autocomplete>
        </md-field>
      </div>
      </div>
  </md-toolbar>
  <div v-if="isStashValid" class="content">
    <div class="md-title stash-info-title">Stash Information</div>
    <md-table class="general-info-table" md-card>
      <md-table-row>
        <md-table-cell>Stash ID</md-table-cell>
        <md-table-cell>
        <div>
        <Identicon class="ident-icon" @click.native="copy(stash)"
          :size="32"
          :theme="'polkadot'"
          :value="stash"
        />
        <div v-if="$isMobile()" id="validator-id">{{stash.substr(0, 5) + '......' + stash.substr(stash.length - 5)}}</div>
        <div v-else id="validator-id">{{stash}}</div>
        </div>
        </md-table-cell>
      </md-table-row>
       <md-table-row>
        <md-table-cell>Total Rewards</md-table-cell>
        <md-table-cell>
          <div class='total-rewards'>{{totalRewards.toFixed(4)}} {{coinName}}</div>
          <div><span class="md-caption era-caption">(From era {{startEra}} to era {{endEra}})</span></div>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <div class="md-title stash-info-title">Era Rewards</div>
    <md-table v-model="eraRewards" class="era-reward-table" md-card>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Era" md-sort-by="era" md-numeric>{{ item.era }}</md-table-cell>
        <md-table-cell md-label="Amount" md-sort-by="amount" md-numeric>{{ item.amount.toFixed(4) }} {{coinName}}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
  <div v-else>
    <md-empty-state class="empty-state-view"
    md-rounded
    md-icon="search"
    md-label="Enter a stash ID to see its staking rewards"
    md-description="">
  </md-empty-state>
  <md-snackbar :md-duration="Infinity" :md-active.sync="showSnakeBar" md-persistent>
      <span>Cannot find staking rewards for {{selectedStash}}</span>
      <md-button class="md-accent" @click="showSnackbar = false">OK</md-button>
  </md-snackbar>
  </div>
</div>
</template>

<script>
const Yaohsin = require('../../scripts/yaohsin');
import Identicon from '@polkadot/vue-identicon';
export default {
  name: 'RewardQuerier',
  mounted: function() {
    if(localStorage.getItem(this.localStorageKey) !== undefined && localStorage.getItem(this.localStorageKey) !== null) {
      let storage = JSON.parse(localStorage.getItem(this.localStorageKey));
      if(!Array.isArray(storage)) {
        storage = [storage];
      }
      const queriedStashes = storage.reduce((acc, stash)=>{
        if(!acc.find(element => element === stash)) {
          acc.push(stash);
        }
        return acc;
      }, []);
      localStorage.setItem(this.localStorageKey, JSON.stringify(queriedStashes));
      this.historicalQuery = JSON.parse(localStorage.getItem(this.localStorageKey));
    }
  },
  data: function() {
    return {
      coinName: '',
      yaohsin: new Yaohsin(),
      selectedStash: '',
      isStashValid: false,
      stash: '',
      totalRewards: 0,
      startEra: 0,
      endEra: 0,
      inDelay: false,
      historicalQuery: [],
      showSnakeBar: false,
      eraRewards: [],
      localStorageKey: 'queriedStashes',
    }
  },
  methods: {
    copy: function(nominator) {
      this.$copyText(nominator);
    },
    saveQueriedRecords(stash) {
      const queriedStrings = localStorage.getItem(this.localStorageKey);
      let queried;
      if(queriedStrings === undefined || queriedStrings === null) {
        queried = [];
      } else {
        try {
          queried = JSON.parse(queriedStrings);
        } catch {
         queried = []; 
        }
      }
      if(!Array.isArray(queried)) {
        queried = [queried];
      }
      queried.push(stash);
      if(queried.length > 10) {
        queried = queried.shift();
      }
      localStorage.setItem(this.localStorageKey, JSON.stringify(queried));
    },
    calcTotalRewards(eraRewards) {
      this.startEra = 0;
      this.endEra = 0;
      this.totalRewards = eraRewards.eraRewards.reduce((acc, era)=>{
        acc += era.amount;
        return acc;
      }, 0);
      eraRewards.eraRewards.map((era)=>{
        if(era.era < this.startEra || this.startEra === 0) {
          this.startEra = era.era
        }
        if(era.era > this.endEra || this.endEra === 0) {
          this.endEra = era.era
        }
      });
    },
    mergeEraRewards(eraRewards) {
      const _eraRewards = {};
      eraRewards.map((reward)=>{
        if(_eraRewards[reward.era] === undefined){
          _eraRewards[reward.era] = reward.amount;
        } else {
          _eraRewards[reward.era] += reward.amount;
        }
      });
      const result = [];
      Object.keys(_eraRewards).map((era)=>{
        result.push({
          era: era,
          amount: _eraRewards[era],
        })
      });
      return result;
    }
  },
  watch: {
    selectedStash: async function(stash) {
      if(stash.length < 32) {
        return;
      }
      if(this.inDelay) return;
      this.inDelay = true;
      setTimeout(()=>{
        this.inDelay = false;
      }, 1000);
      this.showSnakeBar = false;
      if(stash.startsWith('1')) {
        this.coinName = 'DOT';
      } else if(stash.charCodeAt(0) >= 65 && stash.charCodeAt(0) <= 90) {
        this.coinName = 'KSM';
      }
      const eraRewards = await this.yaohsin.getStashRewards(stash, {coin: this.coinName});
      if(eraRewards !== undefined) {
        this.isStashValid = true;
        this.saveQueriedRecords(stash);
        this.calcTotalRewards(eraRewards);
        this.eraRewards = this.mergeEraRewards(eraRewards.eraRewards);
        this.stash = eraRewards.stash;
      } else {
        this.showSnakeBar = true;
        this.isStashValid = false;
      }
    }
  },
  components: {
    Identicon,
  },
}
</script>

<style lang="scss" scoped>
.stash-info-title {
  text-align: left;
  padding-bottom: 12px;
  padding-top: 32px;
  margin-left: 32px;
}
#reward-querier {
  min-height: 88vh;
}
.general-info-table {
  margin-left: 32px;
  margin-right: 32px;
}

.era-reward-table {
  margin-left: 32px;
  margin-right: 32px;
}
.empty-state-view {
  position: absolute;
  top: 50%;
  left: 50%;
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}
.search-bar {
  max-width: 600px;
  height: 40px;
  vertical-align: middle;
}
.content {
  padding-top: 32px;
  padding-bottom: 32px;
}
.ident-icon {
  display: inline-block;
  cursor: copy;
}
#validator-id {
  display: inline-block;
  font-size: 10px;
  vertical-align: super;
  padding-left: 8px;
}
.era-caption {
  padding-left: 12px;
  display: inline-block;
}
.total-reward {
  display: inline-block;
}
</style>