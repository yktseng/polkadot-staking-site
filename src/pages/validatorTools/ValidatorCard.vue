<template>
  <div id="validator-card">
    <md-card v-bind:id="stash" v-bind:class="{'inactive-validator': activeKSM === 0}">
      <md-card-header>
        <div class="md-title">
          <Identicon @click.native="copy" class="ident-icon"
          :size="32"
          :theme="'polkadot'"
          :value="stash"
         /> {{displayName}}
        </div>
        
        <div class="md-subhead">{{activeKSM.toFixed(3)}} KSM</div>
        <div class="md-subhead" v-if="!isLoading && allKSM !== undefined">{{allKSM.toFixed(3)}} KSM</div>
        <div class="md-subhead" v-if="isLoading">Loading total nominated amount...</div>
      </md-card-header>
      <md-card-content>
        Nominator Count: {{nominators.length}}<br>
        Commission: {{(commission / 10000000).toFixed(1)}}%
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
    commission: Number,
    allKSM: Number,
    isLoading: Boolean
  },
  data: function() {
    return {
    }
  },
  mounted: async function() {
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
  .inactive-validator {
    background-color: #bbbbbb;
  }
  .ident-icon {
    cursor: copy;
  }
</style>