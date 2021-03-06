<template>
  <div id="validator-card">
    <md-card>
      <md-card-header>
        <div class="md-title">
          <Identicon @click.native="copy"
          :size="32"
          :theme="'polkadot'"
          :value="stash"
         /> {{displayName}}
        </div>
        
        <div class="md-subhead">{{activeKSM}} KSM</div>
      </md-card-header>
      <md-card-content>
        Nominator Count: {{nominators.length}}<br>
        Commission: {{commission / 10000000}}%
        <!-- <div class='nominator-list' v-for="(nominator, index) in nominators" :key="index">
          <Identicon @click.native="copy"
          :size="32"
          :theme="'polkadot'"
          :value="nominator"
          />
        </div> -->
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import Identicon from '@polkadot/vue-identicon';
export default {
  name: 'ValidatorCard',
  props: {
    displayName: String,
    activeKSM: Number,
    stash: String,
    nominators: Array,
  },
  data: function() {
    return {
      commission: 0,
    }
  },
  mounted: async function() {
    if(this.commission === 1) {
      this.commission = 0;
    }
  },
  methods: {
    copy: function() {
      this.$copyText(this.stash);
    }
  },
  components: {
    Identicon
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .md-card {
    margin: 4px;
    min-height: 250px;
    max-height: 250px;
    vertical-align: top;
  }
  .md-title {
    font-size: 8px;
    word-break: break-all;
  }
</style>