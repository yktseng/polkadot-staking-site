<template>
  <div id="coin-cards" >
    <div class='card-container' v-for="(currency, index) in coins" :key="index">
      <coin-card v-bind:displayName="currency.displayName"/>
    </div>
  </div>
</template>

<script>
import CoinCard from './CoinCard.vue'

export default {
  name: 'CoinCards',
  props: {
    coins: Array
  },
  components: {
    CoinCard
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #coin-cards {
    margin-top: -120px;
    width: 80vw;
    background-color: #fafafa;
    margin-left: auto;
    margin-right: auto;
    z-index: 10;
    position: relative;
    display: inline-block;
  }

  .card-container {
    width: 33%;
    min-width: 240px;
    min-height: 268px;
    max-height: 268px;
    position: relative;
    display: inline-block;
  }
</style>