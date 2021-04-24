<template>
  <div id="coin-cards" class="md-elevation-10">
    <div class='md-layout md-gutter'>
      <ksm-coin-card/>
      <dot-coin-card/>
    </div>
  </div>
</template>

<script>
import KsmCoinCard from './coinCards/KsmCoinCard.vue'
import DotCoinCard from './coinCards/DotCoinCard.vue'
export default {
  name: 'CoinCards',
  components: {
    KsmCoinCard,
    DotCoinCard
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #coin-cards {
    margin-top: 10vh;
    padding-bottom: 20px;
    width: 80vw;
    background-color:#76828d;
    margin-left: auto;
    margin-right: auto;
    z-index: 10;
    position: relative;
    display: inline-block;
  }

</style>