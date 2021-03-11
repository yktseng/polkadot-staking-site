<template>
  <div id="contact-page">
    <div class="riot-id">
      Riot ID: tanis_37:matrix.org
    </div>
    <div class="github-id">
      github: yktseng
    </div>
    <div class="ksm-stash">
      Kusama Stash<br>---------------------------------------------------------------------
      <table id="kusama-table">
        <tr>
          <td class="ident-icon-column"><Identicon @click.native="copy('H4EeouHL5LawTqq2itu6auF62hDRX2LEBYk1TxS6QMrn9Hg')" class="ident-icon"
          :size="32"
          :theme="'polkadot'"
          :value="'H4EeouHL5LawTqq2itu6auF62hDRX2LEBYk1TxS6QMrn9Hg'"/></td>
          <td>DRAGONLANCE</td>
          <td>H4EeouHL5LawTqq2itu6auF62hDRX2LEBYk1TxS6QMrn9Hg</td>
        </tr>
        <tr>
          <td class="ident-icon-column"><Identicon @click.native="copy('HRfhckygfiHkqVW19e71R2pXNbR6om7138sLAJENt2Tw1HF')" class="ident-icon"
          :size="32"
          :theme="'polkadot'"
          :value="'HRfhckygfiHkqVW19e71R2pXNbR6om7138sLAJENt2Tw1HF'"/></td>
          <td>KRYNN</td>
          <td>HRfhckygfiHkqVW19e71R2pXNbR6om7138sLAJENt2Tw1HF</td>
        </tr>
        <tr>
          <td class="ident-icon-column"><Identicon @click.native="copy('GCNeCFUCEjcJ8XQxJe1QuExpS61MavucrnEAVpcngWBYsP2')" class="ident-icon"
          :size="32"
          :theme="'polkadot'"
          :value="'GCNeCFUCEjcJ8XQxJe1QuExpS61MavucrnEAVpcngWBYsP2'"/></td>
          <td>TAIWAN 001</td>
          <td>GCNeCFUCEjcJ8XQxJe1QuExpS61MavucrnEAVpcngWBYsP2</td>
        </tr>
        <tr>
          <td class="ident-icon-column"><Identicon @click.native="copy('CjU6xRgu5f9utpaCbYHBWZGxZPrpgUPSSXqSQQG5mkH9LKM')" class="ident-icon"
          :size="32"
          :theme="'polkadot'"
          :value="'CjU6xRgu5f9utpaCbYHBWZGxZPrpgUPSSXqSQQG5mkH9LKM'"/></td>
          <td>HSINCHU</td>
          <td>CjU6xRgu5f9utpaCbYHBWZGxZPrpgUPSSXqSQQG5mkH9LKM</td>
        </tr>
        <tr>
          <td class="ident-icon-column"><Identicon @click.native="copy('EMrTktHLYSHAqpVH3f2KMMoLkZPMWjeQAZLpZTJ6KgNcXVr')" class="ident-icon"
          :size="32"
          :theme="'polkadot'"
          :value="'EMrTktHLYSHAqpVH3f2KMMoLkZPMWjeQAZLpZTJ6KgNcXVr'"/></td>
          <td>TAICHUNG</td>
          <td>EMrTktHLYSHAqpVH3f2KMMoLkZPMWjeQAZLpZTJ6KgNcXVr</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Identicon from '@polkadot/vue-identicon';
export default {
  name: 'contactPage',
  data: ()=>{
    return {
      ksmStashes: [
        {
          name: 'DRAGONLANCE',
          stash: 'H4EeouHL5LawTqq2itu6auF62hDRX2LEBYk1TxS6QMrn9Hg',
        }
      ]
    }
  }, 
  components: {
    Identicon
  },
  methods: {
    copy: function(stash) {
      this.$copyText(stash);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #contact-page {
    position: relative;
    z-index: 5;
    background-color: #293031;
    width: 100%;
    height: 88vh;
  }
  .riot-id {
    padding-top:100px;
    color: #61ba89;
  }
  .github-id {
    padding-top:50px;
    color: #61ba89;
  }
  .ksm-stash {
    padding-top:50px;
    color: #61ba89;
  }
  #kusama-table {
    padding-top: 20px;
    margin-left: auto;
    margin-right: auto;
  }
  .ident-icon-column {
    padding-right: 12px;;
  }
  .ident-icon {
    display: inline-block;
    cursor: copy;
  }
</style>
