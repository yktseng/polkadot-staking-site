 
  <template>
  <div id="staking-guide">
    <md-dialog :md-active.sync="showDialog" @md-closed="onClose"  class="staking-guide">
      <md-dialog-title>Staking on Kusama</md-dialog-title>
      <md-dialog-content>
      <div v-if="!$isMobile()" class="desc">
        Search for the validator on <a href="https://polkadot.js.org/apps/#/staking/waiting">Polkadot App</a> and nominate it.
        <table id="kusama-table">
            <tr>
              <td class="ident-icon-column"><Identicon @click.native="copy('14AzFH6Vq1Vefp6eQYPK8DWuvYuUm3xVAvcN9wS352QsCH8L')" class="ident-icon"
              :size="32"
              :theme="'polkadot'"
              :value="'14AzFH6Vq1Vefp6eQYPK8DWuvYuUm3xVAvcN9wS352QsCH8L'"/></td>
              <td>Cryptolab.network</td>
              <td>14AzFH6Vq1Vefp6eQYPK8DWuvYuUm3xVAvcN9wS352QsCH8L</td>
            </tr>
        </table>
      </div>
      <div v-else  class="desc">
        Search the validator on <a href="https://polkadot.js.org/apps/#/staking/waiting">Polkadot App</a> and nominate it.
        <table id="kusama-table">
          <tr>
            <td><Identicon @click.native="copy('14AzFH6Vq1Vefp6eQYPK8DWuvYuUm3xVAvcN9wS352QsCH8L')" class="ident-icon"
                  :size="32"
                  :theme="'polkadot'"
                  :value="'14AzFH6Vq1Vefp6eQYPK8DWuvYuUm3xVAvcN9wS352QsCH8L'"/>
            </td>
            <td>Cryptolab.network</td>
          </tr>
        </table>
      </div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-raised md-primary" @click="$emit('close-guide')">OK</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import Identicon from '@polkadot/vue-identicon';
export default {
  name: 'StakingGuide',
  props: {
    open: Boolean,
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
    copy: function(nominator) {
      this.$copyText(nominator);
    },
  },
  components: {
    Identicon
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .desc {
    padding-top: 32px;
  }
  .ident-icon {
    display: inline-block;
    cursor: copy;
  }
  .md-content {
    overflow: auto;
  }
  .desc {
    margin-bottom: 32px;
  }
  #kusama-table {
    padding-top: 32px;
  }
</style>
