<template>
  <div id="app">
    <site-nav/>
    <landing-page/>
    <validator-cards v-bind:validators="[0, 1, 2]"/>
  </div>
</template>

<script>
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
