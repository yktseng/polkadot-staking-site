<template>
  <div id="validator-card">
    <md-card md-with-hover>
      <md-card-media class="currency-img">
        <img src="../assets/img/kusama-logo.png" alt="KSM">
      </md-card-media>

      <md-card-header>
        <div class="md-title">{{displayName}}</div>
        <div class="md-subhead">Subtitle here</div>
      </md-card-header>

      <md-card-expand>
        <md-card-actions md-alignment="space-between">
          <div>
            <md-button>Stake</md-button>
          </div>
          <md-card-expand-trigger>
            <md-button class="md-icon-button">
              <md-icon>keyboard_arrow_down</md-icon>
            </md-button>
          </md-card-expand-trigger>
        </md-card-actions>

        <md-card-expand-content>
          <md-card-content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'ValidatorCard',
  props: {
    displayName: String,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .md-card {
    margin: 20px;

    vertical-align: top;
    
  }

  .currency-img {
    max-width: 120px;
    max-height: 120px;
    margin: auto;
  }
</style>