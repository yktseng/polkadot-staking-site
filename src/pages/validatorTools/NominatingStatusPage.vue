<template>
  <div id="nominatingStatus">
    <md-progress-bar md-mode="query" v-if="showProgressBar"></md-progress-bar>
    <p v-if="showProgressBar">Loading 1kv status...</p>
    <md-toolbar v-if="!showProgressBar">
      <div class="md-toolbar-row">
      <div class='md-toolbar-section-start search-bar '> 
        <md-icon id="search-icon">search</md-icon>
        <md-autocomplete v-model="selectedStash" :md-options="stashes" @md-changed="getStashes" @md-selected="onSearchSelected" @keydown.enter.native="onSearchSelected" @focusout.native="onSearchSelected"/>
      </div>
      <div class="md-toolbar-section-end">
        <md-button class="md-icon-button" @click="onClickAnalytics">
          <md-icon>analytics</md-icon>
        </md-button>
        <md-button class="md-icon-button">
          <md-icon >sort</md-icon>
        </md-button>
      </div>
      </div>
    </md-toolbar>
    <div class='card-container' v-for="(validator, index) in displayValidators" :key="index">
      <validator-card v-bind:displayName="validator.identity.display" v-bind:activeKSM="validator.exposure.total / 1000000000000 || 0"
      v-bind:allKSM="validator.inactiveKSM || 0"
      v-bind:stash="validator.stashId"
      v-bind:nominators="validator.nominators"
      v-bind:commission="validator.validatorPrefs.commission"
      v-bind:isLoading="validator.isLoading"/>
    </div>
    <analytics-dialog v-if="showAnalytics" v-bind:open="showAnalytics" v-bind:validators="validators" @close-guide="showAnalytics = false"/>
  </div>
</template>

<script>
const Yaohsin = require('../../scripts/yaohsin');
import ValidatorCard from './ValidatorCard.vue';
import AnalyticsDialog from './AnalyticsDialog.vue';
export default {
  name: 'nominatingStatus',
  data: function() {
    return {
      validators: [],
      nominators: [],
      stashes: [],
      selectedStash: '',
      displayValidators: [],
      showProgressBar: false,
      showAnalytics: false,
    }
  },
  mounted: async function() {
    this.showProgressBar = true;
    const yaohsin = new Yaohsin();
    const result = await yaohsin.getAllValidatorAndNominators();
    console.log(result);
    this.validators = result.validators;
    this.nominators = result.nominations;
    for(let i = 0; i < this.validators.length; i++) {
    // this.validators.forEach((v)=>{
      const v = this.validators[i];
      v.isLoading = true;
      if(v.identity.displayParent !== undefined) {
        v.identity.display = `${v.identity.displayParent}/${v.identity.display}`
      }
      if(v.identity.display === undefined) {
        v.identity.display = `${v.accountId}`;
      }
      this.balances = await yaohsin.getNominatorBalances(v.nominators);
      v.inactiveKSM = this.balances.reduce((acc, v_)=>{
        acc += (parseInt(v_.amount) / 1000000000000);
        return acc;
      }, 0);
      this.displayValidators.push(v);
      v.isLoading = false;
    }
    this.displayValidators = this.displayValidators.sort((a, b) => a.identity.display.localeCompare(b.identity.display));
    this.showProgressBar = false;
    // for(let i = 0; i < this.validators.nominators.length; i++) {
    //   const n = this.validators.nominators;
    //   await this.yaohsin.getNominatorBalances(this.validators.nominators);
    // }
  },
  methods: {
    getStashes: function(term) {
      this.stashes = new Promise((resolve)=>{
        const matched = [];
        this.validators.forEach((v)=>{
          if(v.identity.display.toUpperCase().includes(term.toUpperCase())) {
            matched.push(v.identity.display);
          }
        });
        // this.nominators.forEach((n)=>{
        //   if(n.nominator.toUpperCase().includes(term.toUpperCase())) {
        //     matched.push(n.nominator);
        //   }
        // });

        resolve(matched);
      });
    },
    onSearchSelected: function(stash) {
      stash = this.selectedStash;
      this.displayValidators = [];
      this.validators.forEach((v)=>{
        if(v.identity.display.toUpperCase().includes(stash.toUpperCase())) {
          this.displayValidators.push(v);
        }
        v.nominators.forEach((n)=>{
          if(n.toUpperCase() === stash.toUpperCase()) {
            this.displayValidators.push(v);
          }
        });
      });
    },
    onClickAnalytics: function() {
      this.showAnalytics = true;
    },
  },
  components: {
    ValidatorCard,
    AnalyticsDialog,
  }
}
</script>

<!-- ,
    AnalyticsDialogAdd "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.card-container {
    width: 8%;
    min-width: 250px;
    margin-top: 12px;
    margin-bottom: 10px;
    position: relative;
    display: inline-block;
    background-color:#404b55;
    vertical-align: top;
  }
.search-bar {
  max-width: 600px;
  height: 40px;
  vertical-align: middle;
}

.tool-bar-icon {
}

</style>