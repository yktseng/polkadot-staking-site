<template>
  <div id="coin-card" class="md-layout-item" >
    <md-card md-with-hover>
      <md-card-media class="currency-img">
        <img src="../assets/img/kusama-logo.svg" alt="KSM">
      </md-card-media>

      <md-card-header>
        <div class="md-title">{{displayName}}</div>
      </md-card-header>

      <md-card-expand>
        <md-card-actions md-alignment="space-between">
          <div>
            <md-button @click="onClickStakingGuide">Stake With Us</md-button>
          </div>
          <md-card-expand-trigger>
            <md-button class="md-icon-button">
              <md-icon>keyboard_arrow_down</md-icon>
            </md-button>
          </md-card-expand-trigger>
        </md-card-actions>

        <md-card-expand-content>
          <md-card-content>
            <md-button @click="onClickCheckReward">Coming soon...</md-button>
          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>
    </md-card>
    <staking-guide v-if="isShowGuide" v-bind:open="isShowGuide" @close-guide="isShowGuide = false"/>
  </div>
</template>

<script>
import StakingGuide from './StakingGuide.vue'
export default {
  name: 'ValidatorCard',
  props: {
    displayName: String,
  },
  data: function() {
    return {
      isShowGuide: this.isShowGuide
    }
  },
  methods: {
    onClickStakingGuide: async function() {
      await showStakingGuide()
      this.isShowGuide = true
    },
    onClickCheckReward: async function() {

    }
  },
  components: {
    StakingGuide
  }
}

const showStakingGuide = function() {
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .md-card {
    margin: 20px;
    min-height: 268px;
    max-height: 268px;
    vertical-align: top;
    
  }

  .currency-img {
    max-width: 120px;
    max-height: 120px;
    margin: auto;
    padding-top: 10px;
  }
</style>                               
