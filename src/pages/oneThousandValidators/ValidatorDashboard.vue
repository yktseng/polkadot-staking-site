<template>
  <div id="validatorStatus">
    <md-progress-bar md-mode="query" v-if="showProgressBar"></md-progress-bar>
    <p v-if="showProgressBar">Loading Nominator Info...</p>
    
    <div class="info-panel">
      <apexchart id="nomination-trend" ref="nomination-trend" width="500" type="line" :options="options" :series="series"></apexchart>
      <div class="info-text">
        <div class="validator-info">
          <Identicon class="ident-icon" @click.native="copy(stash)"
            :size="32"
            :theme="'polkadot'"
            :value="stash"
          />
          <div id="validator-id">{{stash}}</div>
        </div>
        <div class="validator-info">Total Nomination Amount: <span style="color: #5f6368">{{inactiveKSM}} KSM</span></div>
      </div>
    </div>
    <div class="nominator-list">
      <div class="nominator" v-for="(nominator, index) in nominators" :key="index">
        <Identicon class="ident-icon" @click.native="copy(nominator)"
            :size="32"
            :theme="'polkadot'"
            :value="nominator.address"
        />
        <div class="detail">
          <div class="stash-id">{{nominator.address.substr(0, 5)}}......{{nominator.address.substr(nominator.address.length - 5)}}</div>
          <div class="bonding" v-if="balances[index] !== null && balances[index] !== undefined">
            {{(balances[index] / 1000000000000).toFixed(3)}} KSM
          </div>
          <div class="bonding" v-if="balances[index] === null || balances[index] === undefined">
            ? KSM
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Yaohsin = require('../../scripts/yaohsin');
import Identicon from '@polkadot/vue-identicon';
export default {
  name: 'validatorStatus',
  data: function() {
    return {
      nominators: [],
      balances: [],
      showProgressBar: false,
      inactiveKSM: 0,
      stash: "",
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: this.xaxisCatagory,
          trim: true,
          hideOverlappingLabels: true,
        },
        yaxis: [
          {
            min: 0,
            labels: {
              formatter: function(val) {
                return val.toFixed(0);
              }
            },
            title: {
              text: "Nominator Count",
              style: {
                color: '#008FFB',
              }
            },
            seriesName: 'Nominator Count'
          },
          {
            min: 0,
            show: false,
            seriesName: 'Nominator Count'
          },
          {
            opposite: true,
            min: 0,
            max: 10,
            title: {
              text: "Commission (%)",
              style: {
                color: '#FEB019',
              }
            },
            seriesName: 'Commission'
          }
        ]
      },
      series: [{
        name: 'Nominator Count',
        data: this.nominatorCounts
      }, {
        name: 'Nominated',
        data: this.exposures,
      }, {
        name: 'Commission',
        data: this.commisions,
      }]
    }
  },
  mounted: async function() {
    this.showProgressBar = true;
    this.yaohsin = new Yaohsin();
    this.stash = this.$route.query.stash;
    const validatorHistory = await this.yaohsin.getValidatorStatus(this.stash);
    this.xaxisCatagory= [];
    this.exposures = [];
    this.nominatorCounts = [];
    this.commissions = [];
    validatorHistory.data[0].info.forEach((eraData)=>{
      this.xaxisCatagory.push(eraData.era.toString());
      this.nominatorCounts.push(eraData.nominators.length);
      this.exposures.push(eraData.exposure.others.length);
      this.commissions.push(eraData.commission);
      this.nominators = eraData.nominators;
    });
    this.updateSeriesLine();
    this.balances = this.nominators.map((nominator) => {
      return nominator.balance.lockedBalance;
    });

    this.inactiveKSM = this.balances.reduce((acc, b)=>{
      console.log(b);
      if(b === null) {
        return acc;
      }
      acc += parseFloat((parseFloat(b / 1000000000000)).toFixed(3));
      return acc;
    }, 0);
    this.inactiveKSM = this.inactiveKSM.toFixed(3);
    this.showProgressBar = false;
  },
  methods: {
    updateSeriesLine() {
      this.$refs['nomination-trend'].updateSeries([{
        data: this.nominatorCounts
      }, {
        data: this.exposures
      }, {
        data: this.commissions
      }], false, true);
      this.options = {
        xaxis: {
          categories: this.xaxisCatagory
        }
      };
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
.nominator-list {
  text-align: left;
  padding-top: 20px;
  padding-left: 20px;
}
.info-text {
  vertical-align: top;
  display: inline-block;
}
.validator-info {
  vertical-align: top;
}
.info-panel {
  padding-top: 30px;
  text-align: left;
  vertical-align: top;
}
#nomination-trend {
  display: inline-block;
  padding-right: 30px;
}
.nominator {
  display: inline-block;
  text-align: left;
  overflow:auto;
  min-width: 150px;
}
.ident-icon {
  display: inline-block;
  cursor: copy;
}
.bonding {
  color: #5f6368;
  font-size: 8px;
}
.detail {
  display: inline-block;
  font-size: 6px;
}
#validator-id {
  display: inline-block;
  color: #5f6368;
  vertical-align: super;
  padding-left: 12px;
}
</style>