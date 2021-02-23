<template>
  <div id="validatorStatus">
    <apexchart ref="nominationTrend" width="500" type="line" :options="options" :series="series"></apexchart>
  </div>
</template>

<script>
const Yaohsin = require('../../scripts/yaohsin');
export default {
  name: 'validatorStatus',
  data: function() {
    return {
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
    console.log(validatorHistory.data[0]);
    validatorHistory.data[0].info.forEach((eraData)=>{
      this.xaxisCatagory.push(eraData.era.toString());
      this.nominatorCounts.push(eraData.nominators.length);
      this.exposures.push(eraData.exposure.length);
      this.commissions.push(eraData.commission);
    });
    console.log(this.xaxisCatagory);
    console.log(this.nominatorCounts);
    console.log(this.exposures);
    this.updateSeriesLine();
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
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>