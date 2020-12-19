<template>
  <div id="validator-cards" >
    <div class='card-container' v-for="(validator, index) in validators" :key="index">
      <validator-card/>
    </div>
  </div>
</template>

<script>
import ValidatorCard from './ValidatorCard.vue'
export default {
  name: 'ValidatorCards',
  props: {
    validators: Array
  },
  components: {
    ValidatorCard
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #validator-cards {
    height: 480px;
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
    position: relative;
    display: inline-block;
  }
</style>