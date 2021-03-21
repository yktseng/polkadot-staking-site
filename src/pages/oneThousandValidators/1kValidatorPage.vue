<template>
  <div id="oneKValidator">
    <md-progress-bar md-mode="query" v-if="showProgressBar"></md-progress-bar>
    <p v-if="showProgressBar">Loading 1kv status...</p>
    <p v-if="isError">Fetching data from our server is failed. Please try again later</p>
    <div v-if="readyToDisplay && !isError">
      <md-content class="stats">
        <p>Total validators: {{oneKVStatus.length}}</p>
        <!--<p>Total nominators: {{currentNominatingStatus.nominators.length}}</p>-->
        <p>Total nominated validators: {{totalNominatedCount}}</p>
        <!--<p>Total elected validators: {{totalElectedNominatorCount}}</p>-->
        
      </md-content>
      <md-table class="onekvTable" v-model="oneKVStatus" md-sort="name" md-sort-order="asc" md-card>
        <md-table-toolbar>
          <h1 class="md-title">Kusama 1k validator info and status</h1>
        </md-table-toolbar>
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell><md-button @click="onClickAnalytic(item.stash)"><md-icon>analytics</md-icon></md-button></md-table-cell>
          <md-table-cell>
            <md-icon v-if="item.elected === true && item.oneKVNominated === false" class="waiting">celebration</md-icon>
            <md-icon v-if="item.elected === false && item.oneKVNominated === true" class="nominated">mood_bad</md-icon>
          </md-table-cell>
          <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
          <md-table-cell md-label="Total Nominators" md-numeric md-sort-by="totalNominators">{{ item.totalNominators }}</md-table-cell>
          <md-table-cell md-label="Active Nominators" md-numeric md-sort-by="activeNominators">{{ item.activeNominators }}</md-table-cell>
          <md-table-cell md-label="Self Stash" md-numeric md-sort-by="stakeSize">{{ Number.parseFloat(item.stakeSize / 1000000000000).toFixed(3) }}</md-table-cell>
          <md-table-cell md-label="Active">
            <md-icon v-if="item.elected === true" class="nominated">check</md-icon>
            <md-icon v-if="item.elected === false" class="waiting">close</md-icon>
          </md-table-cell>
          <md-table-cell md-label="1KV Nominated">
            <md-icon v-if="item.oneKVNominated === true" class="nominated">check</md-icon>
            <md-icon v-if="item.oneKVNominated === false" class="waiting">close</md-icon>
          </md-table-cell>
          <md-table-cell md-label="rank" md-numeric md-sort-by="rank">{{ item.rank }}</md-table-cell>
          <md-table-cell md-label="Elected Rate" md-numeric md-sort-by="electedRate">{{ Number.parseFloat(item.electedRate).toFixed(2) }}</md-table-cell>
        </md-table-row>
      </md-table>
    </div>
  </div>
</template>

<script>
const Yaohsin = require('../../scripts/yaohsin');
export default {
  name: 'oneKValidator',
  data: function() {
    return {
      oneKVStatus: [],
      showProgressBar: false,
      readyToDisplay: false,
      currentNominatingStatus: [],
      totalNominatedCount: 0,
      totalElectedNominatorCount: 0,
      isError: false,
    }
  },
  mounted: async function() {
    this.yaohsin = new Yaohsin();
    this.showProgressBar = true;
    const result = await this.yaohsin.getOneKVInfo().catch(()=>{
      this.isError = true;
    });
    if(this.isError) {
      this.showProgressBar = false;
      return;
    }
    const oneKVOfficial = await this.yaohsin.getOneKVOfficialNominators();
    const oneKVNominators = oneKVOfficial.nominators;
    this.totalValidatorCount = result.valid.length;
    this.totalNominatedCount = result.electedCount;
    this.oneKVStatus = result.valid;
    this.yaohsin.getOneKVDetailedInfo().then((detail)=>{
      this.oneKVStatus = this.yaohsin.mergeOneKVList(this.oneKVStatus, detail.valid, oneKVNominators);
      this.$forceUpdate();
      this.showProgressBar = false;
    }).catch(()=>{
      this.isError = true;
    });
    if(this.isError) {
      this.showProgressBar = false;
      return;
    }
    this.readyToDisplay = true;
  },
  methods: {
    onClickAnalytic: function(stash) {
      console.log(stash);
      let routeData = this.$router.resolve({path: 'validatorStatus', query: {stash: stash}});
      window.open(routeData.href, '_blank');
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
  .onekvTable {
    width: 100vw;
  }
  .nominated {
    color: #4FC50B !important;
  }
  .waiting {
    color: #FF2D00 !important;
  }
</style>