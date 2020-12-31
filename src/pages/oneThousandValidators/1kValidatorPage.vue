<template>
  <div id="oneKValidator">
    <md-progress-bar md-mode="query" v-if="showProgressBar"></md-progress-bar>
    <md-content class="stats">
      <p>Total validators: {{oneKVStatus.length}}</p>
      <p>Total nominators: {{currentNominatingStatus.data.nominators.length}}</p>
      <p>Total nominated validators: {{totalNominatedCount}}</p>
      <p>Total elected validators: {{totalElectedNominatorCount}}</p>
      
    </md-content>
    <md-table v-model="oneKVStatus" md-sort="name" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Kusama 1k validator info and status</h1>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="1KV proxy account" md-sort-by="nominator">{{ item.nominator }}</md-table-cell>
        <md-table-cell md-label="Elected" md-numeric md-sort-by="elected">{{ item.elected? "Yes" : "No" }}</md-table-cell>
        <md-table-cell md-label="rank" md-numeric md-sort-by="rank">{{ item.rank }}</md-table-cell>
        <md-table-cell md-label="electedRate" md-numeric md-sort-by="electedRate">{{ item.electedRate }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
const axios = require('axios');
const Yaohsin = require('../../scripts/yaohsin');
export default {
  name: 'oneKValidator',
  data: function() {
    return {
      oneKVStatus: [],
      showProgressBar: false,
      currentNominatingStatus: [],
      totalNominatedCount: 0,
      totalElectedNominatorCount: 0,
    }
  },
  // check status: 200
  mounted: async function() {
    this.yaohsin = new Yaohsin();
    this.showProgressBar = true;
    const result = await axios.get('https://kusama.yaohsin.net/api/onekvlist?rate=100');
    this.currentNominatingStatus = await this.yaohsin.getCurrentNominatingStatus();
    this.oneKVStatus = this.yaohsin.mergeOneKVListAndNominatingStatus(result.data, this.currentNominatingStatus.data);
    this.totalNominatedCount = this.oneKVStatus.reduce((acc, v)=>{
      if(v.nominator !== undefined) {
        acc++;
      }
      return acc;
    }, 0);
    this.totalElectedNominatorCount = this.oneKVStatus.reduce((acc, v)=>{
      if(v.elected === true) {
        acc++;
      }
      return acc;
    }, 0);
    this.showProgressBar = false;
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #oneKValidator {
    height: 87vh;
  }
  tr:nth-child(even){
    background-color:#fafafa;
  }
  tr:nth-child(odd){
    background-color: #e7e7e7;
  }
  .stats {
    display: block;
    justify-content: flex-start;
    align-items: flex-start;
  }
</style>