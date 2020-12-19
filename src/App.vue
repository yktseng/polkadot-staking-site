<template>
  <div id="app">
    <site-nav/>
    <landing-page/>
    <validator-cards v-bind:validators="validators"/>
  </div>
</template>

<script>
const polkadot = require('../src/scripts/polkadot');

import LandingPage from './components/LandingPage.vue'
import SiteNav from './components/SiteNav.vue'
import ValidatorCards from './components/ValidatorCards.vue'

export default {
  name: 'App',
  components: {
    LandingPage,
    SiteNav,
    ValidatorCards,
  },
  created: async function() {
    await polkadot.connect();
    this.validators = await polkadot.retrieveValidators();
  },
  data: ()=>{
    return {
      validators: []
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
