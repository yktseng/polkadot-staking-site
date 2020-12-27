<template>
  <div id="site-nav">
    <md-app md-mode="fixed" >
      <md-app-toolbar class="site-nav">
      <span class="md-title"><span style="color:#FFFFFF">Crypto</span><span style="color:#979DAC">Currency</span><span style="color:#FFFFFF">Lab</span></span>
      <div class="md-toolbar-section-end">
        <md-button class="md-button nav-button" @click="onClickTool">
          Tools
        </md-button>
        <md-button class="md-button nav-button" @click="onClickStake">
          Stake with Us
        </md-button>
        <md-button class="md-button nav-button">
          Blog
        </md-button>
        <md-button class="md-button nav-button">
          Contact
        </md-button>
      </div>
      </md-app-toolbar>
    </md-app>
  </div>
</template>

<script>
export default {
  name: 'SiteNav',
  methods: {
    onClickTool: function() {
      this.$router.push('/tools');
    },
    onClickStake: function() {
      this.$router.push('/');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .site-nav {
    background-color: #001233 !important;
  }

  .nav-button {
    color: #FFFFFF !important;
  }
</style>
