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
    margin-top: -160px;
    width: 80vw;
    background-color: #fafafa;
    margin-left: auto;
    margin-right: auto;
    z-index: 10;
    position: relative;
    display: inline-block;
    -webkit-box-shadow: 10px 10px 5px 0px rgba(179,179,179,1);
    -moz-box-shadow: 10px 10px 5px 0px rgba(179,179,179,1);
    box-shadow: 10px 10px 5px 0px rgba(179,179,179,1);
  }

  .card-container {
    width: 33%;
    min-width: 240px;
    min-height: 268px;
    max-height: 268px;
    margin-bottom: 40px;
    position: relative;
    display: inline-block;
  }
</style>