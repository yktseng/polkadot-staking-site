<template>
  <div id="tool-page">    
    <div v-if="$isMobile()" class="main-desc md-display-1"><span style="color:#61ba89">Crypto</span> Currency <span style="color:#61ba89"><br><span style="padding-left:16vw">Tools and Analysis</span></span></div>
    <div v-else class="main-desc md-display-4"><span style="color:#61ba89">Crypto</span> Currency <span style="color:#61ba89"><br><span style="padding-left:20vw">Tools and Analysis</span></span></div>
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
        displayName: 'Kusama One Thousand Validator Monitor',
        route: '/tools/oneKValidators',
      }, {
        displayName: 'Kusama Validator / Nominator Status',
        route: '/tools/ksmVN',
      },{
        displayName: 'Polkadot Validator / Nominator Status',
        route: '/tools/dotVN',
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
    padding-top: 10vh;
    padding-left: 10vw;
    text-align: left;
    color: #FAFAFA;
    font: normal normal normal sans-serif;
  }
  
</style>
