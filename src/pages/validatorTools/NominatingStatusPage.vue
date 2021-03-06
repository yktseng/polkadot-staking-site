<template>
  <div id="nominatingStatus">
    <div class='tool-bar'>
      <md-icon class='tool-bar-items'>search</md-icon>
      <md-autocomplete class='tool-bar-items' id="search-bar" v-model="selectedStash" :md-options="stashes" @md-changed="getStashes" @md-selected="onSearchSelected" @keydown.enter.native="onSearchSelected" @focusout.native="onSearchSelected"/>
      <md-icon class='tool-bar-items'>sort</md-icon>
    </div>
    <div class='card-container' v-for="(validator, index) in displayValidators" :key="index">
      <validator-card v-bind:displayName="validator.identity.display" v-bind:activeKSM="validator.exposure.total / 1000000000000 || 0"
      v-bind:stash="validator.stashId"
      v-bind:nominators="validator.nominators"
      v-bind:commission="validator.validatorPrefs.commission"/>
    </div>
  </div>
</template>

<script>
const Yaohsin = require('../../scripts/yaohsin');
import ValidatorCard from './ValidatorCard.vue'
export default {
  name: 'nominatingStatus',
  data: function() {
    return {
      validators: [],
      nominators: [],
      stashes: [],
      selectedStash: '',
      displayValidators: [],
    }
  },
  mounted: async function() {
    const yaohsin = new Yaohsin();
    const result = await yaohsin.getAllValidatorAndNominators();
    console.log(result);
    this.validators = result.validators;
    this.nominators = result.nominations;
    this.validators.forEach((v)=>{
      if(v.identity.displayParent !== undefined) {
        v.identity.display = `${v.identity.displayParent}/${v.identity.display}`
      }
      if(v.identity.display === undefined) {
        v.identity.display = `${v.accountId}`;
      }
      this.displayValidators.push(v);
    });
    this.displayValidators.sort((a, b) => a.identity.display.localeCompare(b.identity.display));
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
  },
  components: {
    ValidatorCard,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.card-container {
    width: 8%;
    min-width: 250px;

    margin-bottom: 10px;
    position: relative;
    display: inline-block;
    background-color:#404b55;
    vertical-align: top;
  }
.tool-bar {
  height: 60px;
  width: 100%;
  text-align: left;
  padding-left:60px;
}
.tool-bar-items {
  display: inline-block;
}
#search-bar {
  width: 360px;
  height: 40px;
  vertical-align: middle;
}
</style>