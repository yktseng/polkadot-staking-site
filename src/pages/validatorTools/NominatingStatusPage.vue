<template>
  <div id="nominatingStatus">
    <md-progress-bar md-mode="query" v-if="showProgressBar"></md-progress-bar>
    <p v-if="showProgressBar">Loading validator and nominator status...</p>
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
        <md-button class="md-icon-button" @click="onClickSorting">
          <md-icon >sort</md-icon>
        </md-button>
      </div>
      </div>
    </md-toolbar>
    <div class='card-container' v-for="(validator, index) in displayValidators" :key="index">
      <validator-card v-bind:displayName="validator.identity.display" v-bind:activeKSM="validator.activeKSM || 0"
      v-bind:allKSM="validator.inactiveKSM || 0"
      v-bind:stash="validator.id"
      v-bind:nominators="validator.info.nominators"
      v-bind:commission="validator.info.commission"
      v-bind:isLoading="validator.isLoading"
      v-bind:favorite.sync="validator.isMissing"
      v-bind:apy="validator.apy"
      @favorite-clicked="onFavoriteClicked"/>
    </div>
    <sort-option-dialog v-if="showSortOptions" v-bind:open="showSortOptions"  @close-sorting-option="showSortOptions = false" @sorting-option="onSortingOptionChanged"/>
    <analytics-dialog v-if="showAnalytics" v-bind:open="showAnalytics" v-bind:validators="validators" @close-guide="showAnalytics = false"/>
  </div>
</template>

<script>
const Yaohsin = require('../../scripts/yaohsin');
import ValidatorCard from './ValidatorCard.vue';
import AnalyticsDialog from './AnalyticsDialog.vue';
import SortOptionDialog from './SortOptionDialog.vue';
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
      showSortOptions: false,
    }
  },
  mounted: async function() {
    this.showProgressBar = true;
    const yaohsin = new Yaohsin();
    const result = await yaohsin.getAllValidatorAndNominators();
    console.log(result);
    this.validators = result;
    for(let i = 0; i < this.validators.length; i++) {
    // this.validators.forEach((v)=>{
      const v = this.validators[i];
      v.isLoading = true;
      if(v.identity !== undefined) {
        if(v.identity.displayParent !== undefined) {
          v.identity.display = `${v.identity.displayParent}/${v.identity.display}`
        }
        if(v.identity.display === undefined) {
          v.identity.display = `${v.id}`;
        }
      } else {
        v.identity = {
          display: v.id,
        };
      }
      v.activeKSM = v.info.exposure.reduce((acc, v_)=>{
        acc += (parseInt(v_.value) / 1000000000000);
        return acc;
      }, 0);
      v.inactiveKSM = v.info.nominators.reduce((acc, v_)=>{
        acc += (parseInt(v_.balance.lockedBalance) / 1000000000000);
        return acc;
      }, 0);
      this.displayValidators.push(v);
      v.isLoading = false;
    }
    this.sortById();
    this.sortByFavorite();
    this.showProgressBar = false;
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
      if(stash === '') {
        this.sortById();
        this.sortByFavorite();
      } else {
        this.displayValidators.splice(0, this.displayValidators.length);
        this.validators.forEach((v)=>{
          if(v.identity.display.toUpperCase().includes(stash.toUpperCase())) {
            this.displayValidators.push(v);
          }
        });
      }
    },
    onClickAnalytics: function() {
      this.showAnalytics = true;
    },
    onClickSorting: function() {
      this.showSortOptions = true;
    },
    onFavoriteClicked: function() {
      if(this.selectedStash === '') {
        this.sortById();
        this.sortByFavorite();
      }
    },
    onSortingOptionChanged: function(option) {
      const sortBy = option.sortBy;
      if(sortBy === 'alphabetical') {
        this.sortById();
      } else if(sortBy === 'apy'){
        this.sortByApy();
      } else {
        this.sortById();
        this.sortByFavorite();
      }
      // this.sortByFavorite();
    },
    sortByApy: function() {
      this.displayValidators = this.displayValidators.sort((a, b) => {
        if(a.apy > b.apy) {
          return -1;
        } else if(a.apy < b.apy) {
          return 1;
        } return 0;
      });
    },
    sortById: function() {
      this.displayValidators = this.displayValidators.sort((a, b) => a.identity.display.localeCompare(b.identity.display));
    },
    sortByFavorite: function() {
      let item = localStorage.getItem('ksm.validator.favorite');
      if(item !== undefined) {
        if(item !== null) {
          const favoriteValidators = JSON.parse(item);
          this.displayValidators.splice(0, this.displayValidators.length);
          this.validators.forEach((v)=>{
            if(favoriteValidators.includes(v.id)) {
              this.displayValidators.push(v);
            }
          });
          this.validators.forEach((v)=>{
            if(favoriteValidators.includes(v.id)) {
              return;
            }
            this.displayValidators.push(v);
          });
        }
      }
    }
  },
  components: {
    ValidatorCard,
    AnalyticsDialog,
    SortOptionDialog,
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