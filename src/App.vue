<template>
  <div id="app">
    <v-app>
      <v-main>
        <v-container fluid>
          <site-nav/>
          <div>
            <router-view default="{name: landingPage}"></router-view>
          </div>
          <bottom-nav/>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>

import SiteNav from './components/SiteNav.vue'
import BottomNav from './components/BottomNav.vue'

export default {
  name: 'App',
  components: {
    SiteNav,
    BottomNav,
  },
  data: function() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
#app {
  font-family: "Roboto";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

</style>
