<template>
  <div id="app">
    <site-nav/>
    <landing-page/>
    <coin-cards v-bind:coins="coins"/>
  </div>
</template>

<script>
const polkadot = require('../src/scripts/polkadot');

import LandingPage from './components/LandingPage.vue'
import SiteNav from './components/SiteNav.vue'
// import ValidatorCards from './components/ValidatorCards.vue'
import CoinCards from './components/CoinCards.vue'

export default {
  name: 'App',
  components: {
    LandingPage,
    SiteNav,
    CoinCards,
  },
  created: async function() {
    await polkadot.connect();
    this.validators = await polkadot.retrieveValidators();
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
