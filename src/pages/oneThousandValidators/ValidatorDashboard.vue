<template>
  <div id="validatorStatus">
    <apexchart ref="nominationTrend" width="500" type="line" :options="options" :series="series"></apexchart>
    <div class="nominator-list">
      <div class="nominator" v-for="(nominator, index) in nominators" :key="index">
        <Identicon class="ident-icon" @click.native="copy(nominator)"
            :size="32"
            :theme="'polkadot'"
            :value="nominator"
        />
        <div class="detail">
          <div class="stash-id">{{nominator.substr(0, 5)}}......{{nominator.substr(nominator.length - 5)}}</div>
          <div class="bonding" v-if="balances[index] !== null && balances[index] !== undefined">
            {{(balances[index].amount / 1000000000000).toFixed(3)}} KSM
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
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: this.xaxisCatagory
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
      this.exposures.push(eraData.exposure.length);
      this.commissions.push(eraData.commission);
      this.nominators = eraData.nominators;
    });
    this.updateSeriesLine();
    this.balances = await this.yaohsin.getNominatorBalances(this.nominators);
  },
  methods: {
    updateSeriesLine() {
      this.$refs.nominationTrend.updateSeries([{
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
.nominator {
  display: inline-block;
  text-align: left;
  overflow:auto;
  min-width: 150px;
}
.ident-icon {
  display: inline-block;
}
.bonding {
  color: #5f6368;
  font-size: 8px;
}
.detail {
  display: inline-block;
  font-size: 6px;
}
</style>