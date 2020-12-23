<template>
  <div id="landing-page">
      <!-- <img src="../assets/img/banner.jpg" />-->
      <div class="main-desc">Earn <span style="color:#7D8597">Crypto </span>Income</div><span class="secondary-desc">in a few steps</span>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #landing-page {
    position: relative;
    z-index: 5;
    background-color: #001845;
    width: 100%;
    height: 660px;
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
    color: #7D8597;
    font: normal normal normal 64px/1.4em roboto ,sans-serif;
  }
</style>
