<template>
  <div id="validator-card">
    <md-card md-with-hover v-bind:id="stash" v-bind:class="{'inactive-validator': activeKSM === 0}" md-ratio="4:3">
    
      <md-card-header>
        <div class="md-title">
          <Identicon @click.native="copy" class="ident-icon"
          :size="32"
          :theme="'polkadot'"
          :value="stash"
        /> {{shortenedDisplayName}}
        </div>
        <div @click="onClickCard(stash)">
          <div class="md-subhead">{{activeKSM.toFixed(3)}} KSM</div>
          <div class="md-subhead" v-if="!isLoading && allKSM !== undefined">{{allKSM.toFixed(3)}} KSM</div>
          <div class="md-subhead" v-if="isLoading">Loading total nominated amount...</div>
        </div>
      </md-card-header>

      <md-card-content>
        <div @click="onClickCard(stash)">
          Nominator Count: {{nominators.length}}<br>
          Commission: {{(commission / 10000000).toFixed(1)}}%
        </div>
        <md-card-actions>
          <md-card-media>
            <md-button class="md-icon-button" @click="onClickFavorite(stash)">
              <md-icon v-bind:class="{'favorite': favorite}">favorite</md-icon>
            </md-button>
          </md-card-media>
        </md-card-actions>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import Identicon from '@polkadot/vue-identicon';
export default {
  name: 'ValidatorCard',
  props: {
    displayName: String,
    activeKSM: Number,
    stash: String,
    nominators: Array,
    commission: Number,
    allKSM: Number,
    isLoading: Boolean,
    favorite: Boolean,
  },
  computed: {
    shortenedDisplayName: function() {
      if(this.displayName.length > 36) {
        return this.displayName.substr(0, 5) + '......' + this.displayName.substr(this.displayName.length - 5)
      }
      return this.displayName;
    },
  },
  mounted: async function() {
     let item = localStorage.getItem('ksm.validator.favorite');
      let favoriteValidators = [];
      if(item !== undefined && item !== null) {
        favoriteValidators = JSON.parse(item);
      }
      const index = favoriteValidators.indexOf(this.stash);
      if(index >= 0) {
        this.$emit('update:favorite', true);
      }
      
  },
  methods: {
    copy: function() {
      this.$copyText(this.stash);
    },
    onClickCard: function(stash) {
      console.log(stash);
      let routeData = this.$router.resolve({path: 'validatorStatus', query: {stash: stash}});
      window.open(routeData.href, '_blank');
    },
    onClickFavorite: function(stash) {
      try{
        if(!this.favorite) {
          let item = localStorage.getItem('ksm.validator.favorite');
          let favoriteValidators = [];
          if(item !== undefined && item !== null) {
            favoriteValidators = JSON.parse(item);
          }
          favoriteValidators.push(stash);
          localStorage.setItem('ksm.validator.favorite', JSON.stringify(favoriteValidators));
          this.$emit('update:favorite', true);
          this.$emit('favorite-clicked', true)
        } else {
          let item = localStorage.getItem('ksm.validator.favorite');
          let favoriteValidators = [];
          if(item !== undefined && item !== null) {
            favoriteValidators = JSON.parse(item);
          }
          const index = favoriteValidators.indexOf(stash);
          favoriteValidators.splice(index, 1);
          localStorage.setItem('ksm.validator.favorite', JSON.stringify(favoriteValidators));
          this.$emit('update:favorite', false);
          this.$emit('favorite-clicked', false)
        }
      } catch {
        localStorage.removeItem('ksm.validator.favorite');
      }
      
    }
  },
  components: {
    Identicon
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .md-card {
    margin: 4px;
    min-height: 250px;
    max-height: 250px;
    vertical-align: top;
  }
  .md-title {
    font-size: 8px;
    word-break: break-all;
  }
  .inactive-validator {
    background-color: #bbbbbb;
  }
  .ident-icon {
    cursor: copy;
  }
  .favorite {
    color: darkorange !important;
  }
</style>