<template>
  <div id="nominatingStatus">
    <md-progress-bar md-mode="query" v-if="showProgressBar"></md-progress-bar>
    <p v-if="showProgressBar">Loading validator and nominator status...</p>
    <p v-if="isError">Fetching data from our server is failed. The site is probably syncing new era data. Please try again later</p>
    <md-toolbar v-if="!showProgressBar && !isError">
      <div class="md-toolbar-row">
      <div class='md-toolbar-section-start search-bar '> 
        <md-icon id="search-icon">search</md-icon>
        <md-autocomplete md-input-placeholder="Search validators or nominators"
        v-model="selectedStash" :md-options="stashes" @md-changed="getStashes" @md-selected="onSearchSelected" @keydown.enter.native="onSearchSelected" @focusout.native="onSearchSelected"/>
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
      <validator-card v-bind:displayName="validator.identity.display || validator.id" v-bind:activeKSM="validator.activeKSM || 0"
      v-bind:allKSM="validator.inactiveKSM || 0"
      v-bind:stash="validator.id"
      v-bind:nominators="validator.info.nominators"
      v-bind:commission="validator.info.commission"
      v-bind:isLoading="validator.isLoading"
      v-bind:favorite.sync="validator.isMissing"
      v-bind:apy="validator.info.apy"
      v-bind:commissionChange="commissionChange(validator)"
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
      isError: false,
    }
  },
  mounted: async function() {
    this.showProgressBar = true;
    const yaohsin = new Yaohsin();
    const result = await yaohsin.getAllValidatorAndNominators().catch(()=>{
      this.isError = true;
    });
    if(this.isError) {
      this.showProgressBar = false;
      return;
    }
    this.validators = result;
    for(let i = 0; i < this.validators.length; i++) {
    // this.validators.forEach((v)=>{
      const v = this.validators[i];
      v.isLoading = true;
     
      if(v.identity === undefined) {
        v.identity = {
          display: v.id,
        };
      }
      if(v.identity.display === null) {
        v.identity = {
          display: v.id,
        };
      }
      v.activeKSM = parseInt(v.info.exposure.total) / 1000000000000;
      v.inactiveKSM = v.info.nominators.reduce((acc, v_)=>{
        acc += (parseInt(v_.balance.lockedBalance) / 1000000000000);
        return acc;
      }, 0);
      this.displayValidators.push(v);
      v.isLoading = false;
    }
    this.displayValidators = this.displayValidators.map(
      function(data, idx)
      {
        data.idx = idx;
        return data;
      }
    );
    this.sortById();
    this.sortByCommissionChange();
    this.sortByFavorite();
    this.showProgressBar = false;

    yaohsin.getAllNominators().then((nominators)=>{
      this.nominators = nominators;
    });
  },
  methods: {
    getStashes: function(term) {
      this.stashes = new Promise((resolve)=>{
        const matched = [];
        this.validators.forEach((v)=>{
          if(v.identity !== undefined) {
            if(v.identity.display.toUpperCase().includes(term.toUpperCase())) {
              matched.push(v.identity.display);
            }
          }
        });
        resolve(matched);
      });
    },
    onSearchClear: function() {
      console.log('sort all');
      this.displayValidators.splice(0, this.displayValidators.length);
      this.validators.forEach((v)=>{
        this.displayValidators.push(v);
      });
      this.sortById();
      this.sortByFavorite();
      this.displayValidators = this.displayValidators.map(
        function(data, idx)
        {
          data.idx = idx;
          return data;
        }
      );
      console.log('sort all ends');
    },
    onSearchSelected: function(stash) {
      stash = this.selectedStash;
      if(stash === '') {
        this.onSearchClear();
      } else {
        this.displayValidators.splice(0, this.displayValidators.length);
        this.validators.forEach((v)=>{
          if(v.identity.display.toUpperCase().includes(stash.toUpperCase())) {
            this.displayValidators.push(v);
          }
          if(v.id.toUpperCase() === stash.toUpperCase()) {
            this.displayValidators.push(v);
          }
        });
        if(this.displayValidators.length === 0) {
          console.log('search nominators');
          this.nominators.forEach((n)=>{
            if(n.accountId === stash) {
              // which is really slow here...
              this.validators.forEach((v)=>{
                n.targets.forEach((t)=>{
                  if(v.id.toUpperCase().includes(t.toUpperCase())) {
                    this.displayValidators.push(v);
                  }
                });
              });
            }
          });
          console.log('search nominators finished');
        }
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
      if(sortBy === 'alphabetical' || sortBy === 'default') {
        this.sortById();
      } else if(sortBy === 'apy'){
        this.sortByApy();
        this.displayValidators = this.displayValidators.map(
        function(data, idx)
        {
          data.idx = idx;
          return data;
        }
        );
      }
      const hightlights = option.highlights;
        if(hightlights.commissionChange === true) {
          this.sortByCommissionChange();
        }
      if(sortBy === 'default') {
        this.sortByFavorite();
      }
      this.displayValidators = this.displayValidators.map(
        function(data, idx)
        {
          data.idx = idx;
          return data;
        }
      );
    },
    sortByCommissionChange: function() {
      this.displayValidators = this.displayValidators.sort((a, b) => {
        if(a.statusChange.commission !== 0 && b.statusChange.commission === 0) {
          return -1;
        } else if (a.statusChange.commission === 0 && b.statusChange.commission !== 0) {
          return 1;
        }
        return a.idx - b.idx;
      });
    },
    sortByApy: function() {
      this.displayValidators = this.displayValidators.sort((a, b) => {
        if(a.info.apy > b.info.apy) {
          return -1;
        } else if(a.info.apy < b.info.apy) {
          return 1;
        }
        return a.idx - b.idx;
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
          this.displayValidators.forEach((v, idx)=>{
            if(favoriteValidators.includes(v.id)) {
              this.displayValidators.splice(idx, 1);
              this.displayValidators.unshift(v);
            }
          });
        }
      }
    },
    commissionChange: function(validator) {
      if(validator.statusChange !== undefined) {
        return validator.statusChange.commission;
      }
      return 0;
    }
  },
  computed: {
    
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