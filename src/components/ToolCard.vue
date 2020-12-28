<template>
  <div id="tool-card">
    <md-card md-with-hover>
      <div @click="onClickCard">
      <md-card-media class="currency-img">
        <img src="../assets/img/kusama-logo.svg" alt="KSM">
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
    displayName: String,
  },
  data: function() {
    return {
    }
  },
  methods: {
    onClickCard: function() {
      this.$router.push('/tools/oneKValidators');
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
