<template>
  <div id="landing-page">
      <!-- <img src="../assets/img/banner.jpg" />-->
      <span class="main-desc">Stake your funds in a few steps</span>
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
    background-color: #001233;
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
</style>
