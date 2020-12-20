 
  <template>
  <div id="staking-guide">
    <md-dialog :md-active.sync="showDialog" class="staking-guide">
      <md-dialog-title>Kusama Stake Guide</md-dialog-title>
      <md-steppers :md-active-step.sync="active" md-linear>
      <md-step id="first" md-label="A simple guide" :md-done.sync="first">
      </md-step>

      <md-step id="second" md-label="Choose validators" :md-done.sync="second">
        <md-list>
          <md-list-item v-for="(validator, index) in validators" :key="index">
            <span class="md-list-item-text">{{validator.displayName}}</span>
          </md-list-item>
          <md-divider class="md-inset"></md-divider>
        </md-list>
        <span>Delegate your KSM to our validators!</span>
      </md-step>

      <md-step id="third" md-label="Bond your Stake" :md-done.sync="third">
        <!-- Ask polkadot extension about the identity of the nominator and the amount of its free funds -->
      </md-step>

      <md-step id="fourth" md-label="See result" :md-done.sync="fourth">
      </md-step>
    </md-steppers>
      <md-dialog-actions>
        <md-button class="md-raised md-primary" @click="setDone(nextStep())">Continue</md-button>
        <md-button class="md-secondary" @click="showDialog = false">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
const polkadot = require('../scripts/polkadot');
export default {
  name: 'StakingGuide',
  props: {
    open: Boolean
  },
  data: function() {
    return {
      showDialog: this.open,
      first: false,
      second: false,
      third: false,
      fourth: false,
      active: 'first',

      validators: [],
    }
  },
  created: async function() {
    await polkadot.connect();
    this.validators = await polkadot.retrieveValidators();
  },
  methods: {
    setDone (index) {
      if (index) {
        this.active = index
      }
    },
    nextStep () {
      switch(this.active) {
        case 'first':
          return 'second';
        case 'second':
          return 'third';
        case 'third':
          return 'fourth';
        case 'fourth':
          return 'fourth';
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>