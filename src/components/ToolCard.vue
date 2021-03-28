<template>
  <div id="tool-card" class="md-layout-item">
    <md-card md-with-hover>
      <div @click="onClickCard">
      <md-card-media class="currency-img">
        <img v-if="coinName === 'KSM'" src="../assets/img/kusama-logo.svg" alt="KSM">
        <img v-if="coinName === 'DOT'" src="../assets/img/polkadot_logo.png" alt="DOT">
      </md-card-media>

      <md-card-header>
        <div class="md-title">{{displayName}}</div>
        <div class="md-subhead">Status and Analysis</div>
      </md-card-header>
      </div>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'ToolCard',
  props: {
    coinName: String,
    displayName: String,
    route: String
  },
  data: function() {
    return {
    }
  },
  methods: {
    onClickCard: function() {
      this.$router.push(this.route);
    }
  },
  components: {
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .md-card {
    margin: 20px;
    min-height: 268px;
    max-height: 268px;
    vertical-align: top;
    
  }

  .currency-img {
    max-width: 120px;
    max-height: 120px;
    margin: auto;
    padding-top: 10px;
  }
</style>                               
