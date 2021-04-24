<template>
  <div id="contact-page">
    <div class="riot-id">
      Riot ID <br><br>
      tanis_37:matrix.org<br>
      yaohsin:matrix.org
    </div>
    <div class="github-id">
      github <br><br>
      yktseng<br>
      iisaint
    </div>
    <div v-if="isMobile === false">
    <div class="official-stash">
      <img src="../assets/logo_dot_small.png"/>
      Official Polkadot Validators <br>---------------------------------------------------------------------
      <table id="kusama-table">
        <tr>
          <td class="ident-icon-column"><Identicon @click.native="copy('14AzFH6Vq1Vefp6eQYPK8DWuvYuUm3xVAvcN9wS352QsCH8L')" class="ident-icon"
          :size="32"
          :theme="'polkadot'"
          :value="'14AzFH6Vq1Vefp6eQYPK8DWuvYuUm3xVAvcN9wS352QsCH8L'"/></td>
          <td>Cryptolab.Network</td>
          <td>14AzFH6Vq1Vefp6eQYPK8DWuvYuUm3xVAvcN9wS352QsCH8L</td>
        </tr>
      </table>
    </div>
    <div class="official-stash">
      <img src="../assets/logo_ksm_small.png"/>
      Official Kusama Validators <br>---------------------------------------------------------------------
      <table id="kusama-table">
        <tr>
          <td class="ident-icon-column"><Identicon @click.native="copy('GA1WBfVMBReXjWKGnXneC682ZZYustFoc8aTsqXv5fFvi2e')" class="ident-icon"
          :size="32"
          :theme="'polkadot'"
          :value="'GA1WBfVMBReXjWKGnXneC682ZZYustFoc8aTsqXv5fFvi2e'"/></td>
          <td>Cryptolab.Network</td>
          <td>GA1WBfVMBReXjWKGnXneC682ZZYustFoc8aTsqXv5fFvi2e</td>
        </tr>
      </table>
    </div>
    <div class="personal-stash">
      Personal Kusama Validators <br>---------------------------------------------------------------------
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
    <div v-else>
      <br><br><span class="search-for">Search for <span class="cryptolab">Cryptolab.network</span> on Polkadot APP to nominate us!</span>
    </div> 
  </div>
</template>

<script>
import Identicon from '@polkadot/vue-identicon';
const constants = require('../scripts/constants');
export default {
  name: 'contactPage',
  data: ()=>{
    return {
      isMobile: constants.isMobile(),
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
    min-height: 88vh;
    font-size: 16px;
    display: flex;
    flex-direction: column;
  }
  .riot-id {
    padding-top:100px;
    color: #61ba89;
  }
  .github-id {
    padding-top:50px;
    color: #61ba89;
  }
  .official-stash {
    padding-top:50px;
    padding-right: 5vw;
    color: #61ba89;
    display: inline-block;
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
  .sub-head {
    font-size: 8px;
  }
  .personal-stash {
    color: #61ba89;
    padding-top: 5vh;
  }
  .search-for {
    color: #61ba89;
  }
  .cryptolab {
    color: #ffffff;
  }
</style>
