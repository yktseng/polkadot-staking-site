<template>
  <div id="oneKValidator">
    <md-progress-bar md-mode="query" v-if="showProgressBar"></md-progress-bar>
    <p v-if="showProgressBar">Loading 1kv status...</p>
    <p v-if="isError">Fetching data from our server is failed. Please try again later</p>
    <div v-if="readyToDisplay && !isError">
      <v-card class="pt-4 pb-2 mb-4 elevation-2 header-card">
        
        <div class="headline ma-2"><span style="color:#61ba89">Kusama One Thousand Validator Monitor</span></div>
        <div class="d-inline-flex">
        <div class="heading-6 ma-2 mb-2"><span style="color:#61ba89" class="mr-2">Total validators: </span>{{oneKVStatus.length}}</div>
        <!--<p>Total nominators: {{currentNominatingStatus.nominators.length}}</p>-->
        <div class="heading-6 ma-2 mb-2"><span style="color:#61ba89" class="mr-2">Total active validators: </span>{{totalNominatedCount}}</div>
        <div class="heading-6 ma-2 mb-2"><span style="color:#61ba89" class="mr-2">Total 1KV elected validators: </span>{{totalOneKvNominatedCount}}</div>
        </div>
      </v-card>
      <v-data-table
        :headers="eraRewardHeaders"
        :items="oneKVStatus"
        :items-per-page="50"
        :footer-props="{
          'items-per-page-options': itemsPerPageOptions,
        }"
        :mobile-breakpoint=0
        class="elevation-2 era-reward-table mb-4">
        <template v-slot:item.dashboard="{ item }">
          <md-button @click="onClickAnalytic(item.stash)"><md-icon>analytics</md-icon></md-button>
        </template>
        <template v-slot:item.commission="{ item }">
          {{ item.commissionZero? 0 : (item.commission / 10000000).toFixed(1) }} %
        </template>
        <template v-slot:item.stakeSize="{ item }">
          {{ Number.parseFloat(item.stakeSize / 1000000000000).toFixed(3) }} KSM
        </template>
        <template v-slot:item.elected="{ item }">
          <md-icon v-if="item.elected === true" class="nominated">check</md-icon>
          <md-icon v-if="item.elected === false" class="waiting">close</md-icon>
        </template>
        <template v-slot:item.oneKVNominated="{ item }">
          <md-icon v-if="item.oneKVNominated === true" class="nominated onekv-nominated-cell">check</md-icon>
          <div v-if="item.oneKVNominated === true" class="onekv-nominated-cell">({{item.nominatedFor}})</div>
          <md-icon v-if="item.oneKVNominated === false" class="waiting">close</md-icon>
        </template>
        <template v-slot:item.electedRate="{ item }">
          {{ Number.parseFloat(item.electedRate * 100).toFixed(2) }} %
        </template>
      </v-data-table>
      <!-- <md-table class="onekvTable" v-model="oneKVStatus" md-sort="name" md-sort-order="asc" md-card>
        <md-table-toolbar>
          <h1 class="md-title">Kusama 1k validator info and status</h1>
        </md-table-toolbar>
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Validator Dashboard"><md-button @click="onClickAnalytic(item.stash)"><md-icon>analytics</md-icon></md-button></md-table-cell>
          <md-table-cell>
            <md-icon v-if="item.elected === true && item.oneKVNominated === false" class="waiting">celebration</md-icon>
            <md-icon v-if="item.elected === false && item.oneKVNominated === true" class="nominated">mood_bad</md-icon>
          </md-table-cell>-->
          <!-- <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
          <md-table-cell md-label="Commission (%)" md-numeric md-sort-by="commission">{{ item.commissionZero? 0 : (item.commission / 10000000).toFixed(1)}}%</md-table-cell>
          <md-table-cell md-label="Total Nominators" md-numeric md-sort-by="totalNominators">{{ item.totalNominators }}</md-table-cell>
          <md-table-cell md-label="Active Nominators" md-numeric md-sort-by="activeNominators">{{ item.activeNominators }}</md-table-cell>
          <md-table-cell md-label="Self Stash" md-numeric md-sort-by="stakeSize">{{ Number.parseFloat(item.stakeSize / 1000000000000).toFixed(3) }}</md-table-cell>-->
          <!--<md-table-cell md-label="Active">
            <md-icon v-if="item.elected === true" class="nominated">check</md-icon>
            <md-icon v-if="item.elected === false" class="waiting">close</md-icon>
          </md-table-cell>
          <md-table-cell md-label="1KV Nominated (Nominated For)">
            <md-icon v-if="item.oneKVNominated === true" class="nominated onekv-nominated-cell">check</md-icon>
            <div v-if="item.oneKVNominated === true" class="onekv-nominated-cell">({{item.nominatedFor}})</div>
            <md-icon v-if="item.oneKVNominated === false" class="waiting">close</md-icon>
          </md-table-cell>
          <md-table-cell class="nomination-order" md-label="Nomination Order" md-numeric md-sort-by="order">{{item.order}}</md-table-cell>
          <md-table-cell md-label="rank" md-numeric md-sort-by="rank">{{ item.rank }}</md-table-cell>
          <md-table-cell md-label="Elected Rate" md-numeric md-sort-by="electedRate">{{ Number.parseFloat(item.electedRate).toFixed(2) }}</md-table-cell>
        </md-table-row>
      </md-table> -->
    </div>
  </div>
</template>

<script>
const Yaohsin = require('../../scripts/yaohsin');
// const constants = require('../scripts/constants');
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
      totalOneKvNominatedCount: 0,
      isError: false,

      itemsPerPageOptions: [10, 50, 100, -1],
      eraRewardHeaders: [
        {
          text: 'Validator Dashboard', value: 'dashboard'
        },
        { text: 'Name', value: 'name', align: 'center'},
        { text: 'Commission', value: 'commission', align: 'right'},
        { text: 'Total Nominators', value: 'totalNominators', align: 'right d-none d-lg-table-cell' },
        { text: 'Active Nominators', value: 'activeNominators', align: 'right d-none d-lg-table-cell' },
        { text: 'Self Stash', value: 'stakeSize', align: 'right d-none d-lg-table-cell' },
        { text: 'Active', value: 'elected', align: 'center'},
        { text: '1KV Nominated (Nominated For)', value: 'oneKVNominated', align: 'center'},
        { text: 'Nomination Order', value: 'order', align: 'right' },
        { text: 'Rank', value: 'rank', align: 'right d-none d-lg-table-cell' },
        { text: 'Elected Rate', value: 'electedRate', align: 'right' },
      ],
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
      this.oneKVStatus.map((v)=>{
        if(v.commission < 1) {
          v.commissionZero === true;
        }
        if(v.oneKVNominated) {
          this.totalOneKvNominatedCount++;
        }
      });
      this.sortByNominationOrder();
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
      let routeData = this.$router.resolve({path: 'validatorStatus', query: {stash: stash, coin: 'KSM'}});
      window.open(routeData.href, '_blank');
    },
    sortByNominationOrder: function() {
      this.oneKVStatus.sort((a, b)=>{
        // add this condition to allow those who have been nominated for 3 era join the ordering.(because they can actually be nominated again)
        if((Date.now() - a.lastNomination < 18 * 3600 * 1000) || (Date.now() - b.lastNomination < 18 * 3600 * 1000)) { // last era, ignore it
          if(a.oneKVNominated === true && b.oneKVNominated === false) {
            return 1;
          }
          if(a.oneKVNominated === false && b.oneKVNominated === true) {
            return -1;
          }
        }
        if(a.aggregate?.aggregate > b.aggregate?.aggregate) {
          return -1;
        } else if(a.aggregate?.aggregate < b.aggregate?.aggregate) {
          return 1;
        }
        return 0;
      });
      for(let i = 0; i < this.oneKVStatus.length; i++) {
        this.oneKVStatus[i].order = i + 1;
      }
    }
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
  .onekv-nominated-cell {
    display: inline-block;
  }

  .header-card {
    background-color:#293031;
    color: #fafafa;
  }
  
  ::v-deep tbody tr:nth-of-type(even) {
    background-color: #d1d2d3;
  }

  ::v-deep tbody tr:nth-of-type(odd) {
    background-color: #e1e2e3;
  }

  ::v-deep .v-data-table-header {
    background-color: #e1e2e3;

  }

  ::v-deep .v-data-footer {
    background-color: #e1e2e3;
  }

  .theme--light.v-data-table thead tr th {
    color: #fafafa;
  }
</style>