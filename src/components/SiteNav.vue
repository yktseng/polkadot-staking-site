<template>
  <div id="site-nav">
    <md-app md-mode="fixed" class="site-nav">
      <md-app-toolbar>

      <span class="md-title"><span style="color:red">Crypto</span>Currency<span style="color:red">Lab</span></span>
      <div class="md-toolbar-section-end">
        <md-button class="md-button">
          Stack with Us
        </md-button>
        <md-button class="md-button">
          Blog
        </md-button>
        <md-button class="md-button">
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .site-nav {
    background-color: #fafafa;
  }
</style>
