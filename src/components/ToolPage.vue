<template>
  <div id="tool-page">
    <div class="main-desc"><span style="color:#61ba89">Crypto</span> Currency <span style="color:#61ba89">Tools and Analysis</span></div>
    <tool-cards v-bind:tools="tools"/>
  </div>
</template>

<script>
import ToolCards from './ToolCards.vue'
export default {
  name: 'ToolPage',
  data: ()=>{
    return {
      validators: [],
      tools: [{
        displayName: 'Kusama 1K validators',
        route: '/tools/oneKValidators',
      }, {
        displayName: 'Kusama Validator / Nominator Status',
        route: '/tools/ksmVN'
      }]
    }
  },
  components: {
    ToolCards,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #tool-page {
    position: relative;
    z-index: 5;
    background-color: #293031;
    width: 100%;
    height: 88vh;
  }

  .main-desc {
    position: absolute;
    top: 160px;
    left: 60px;
    color: #FAFAFA;
    font-size: 72px;
    font: normal normal normal 96px/1.4em roboto ,sans-serif;
  }
</style>
