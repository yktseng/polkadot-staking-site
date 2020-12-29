<template>
  <div id="landing-page">
    <!-- <img src="../assets/img/banner.jpg" />-->
    <div class="main-desc">Earn <span style="color:#61ba89">Crypto </span>Income</div><span class="secondary-desc">in a few steps</span>
    <coin-cards v-bind:coins="coins"/>
  </div>

</template>

<script>
const polkadot = require('../scripts/polkadot');

import CoinCards from './CoinCards.vue'
export default {
  name: 'LandingPage',
  components: {
    CoinCards,
  },
  created: async function() {
    await polkadot.connect();
    // this.validators = await polkadot.retrieveValidators();
  },
  data: ()=>{
    return {
      validators: [],
      coins: [{
        displayName: 'Kusama',
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #landing-page {
    position: relative;
    z-index: 5;
    background-color: #293031;
    width: 100%;
    height: 88vh;
  }

  .main-desc {
    position: absolute;
    top: 160px;
    left: 60px;
    color: #FAFAFA;
    font-size: 72px;
    font: normal normal normal 96px/1.4em roboto ,sans-serif;
  }
  .secondary-desc {
    position: absolute;
    top: 272px;
    left: 600px;
    color: #61ba89;
    font: normal normal normal 64px/1.4em roboto ,sans-serif;
  }
</style>
