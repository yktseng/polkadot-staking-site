<template>
  <div id="tool-page">
    <!-- <div class="stake-desc">
      Support us by nominating the following Kusama validators
      <br><br>
      <table class="validator-table">
        <tr>
          <td class="validator-name">DRAGONLANCE</td>
          <td class="validator-id">H4EeouHL5LawTqq2itu6auF62hDRX2LEBYk1TxS6QMrn9Hg</td>
        </tr>
        <tr>
          <td class="validator-name">KRYNN</td>
          <td class="validator-id">HRfhckygfiHkqVW19e71R2pXNbR6om7138sLAJENt2Tw1HF</td>
        </tr>
      </table>
    </div> -->
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
        displayName: 'Kusama One Thousand Validator Monitor',
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
  .stake-desc {
    text-align: right;
    color:  #61ba89;
    margin-right: 20px;
    margin-left: auto;
  }
  .main-desc {
    position: absolute;
    top: 160px;
    left: 60px;
    color: #FAFAFA;
    font-size: 72px;
    font: normal normal normal 96px/1.4em roboto ,sans-serif;
  }
  .validator-name {
    text-align: right;
  }

  .validator-id {
    text-align: left;
    padding-left: 12px;
  }

  .validator-table {
    margin-right: 0px;
    margin-left: auto;
  }
</style>
