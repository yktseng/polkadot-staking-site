<template>
  <div id="nominator-dashboard">
      <md-dialog :md-active.sync="showDialog" @md-closed="onClose">
          <md-dialog-title>{{nominator.address}}</md-dialog-title>
      </md-dialog>
  </div>
</template>

<script>
// const Yaohsin = require('../../scripts/yaohsin');
// // const constants = require('../scripts/constants');
export default {
  name: 'nominatorDashboard',
  props: {
    open: Boolean,
    validators: Array,
    nominator: Object,
  },
  data: function() {
    return {
      showDialog: this.open,
    }
  },
  methods: {
    onClose() {
      this.showDialog = false;
      this.$emit('close-guide');
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  tr:nth-child(even){
    background-color:#fafafa;
  }
  tr:nth-child(odd){
    background-color: #e7e7e7;
  }
  
</style>