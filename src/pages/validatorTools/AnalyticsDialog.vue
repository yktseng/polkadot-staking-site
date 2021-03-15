<template>
<div id="analytics-dialog">
  <md-dialog :md-active.sync="showDialog" @md-closed="onClose" class="analytics-dialog">
    <md-content>
      <apexchart ref="commission-distribution" id="commission-distribution" width="500" type="bar" :options="commissionOptions" :series="commissionSeries"/>
      <apexchart ref="stake-distribution" id="stake-distribution" width="500" type="bar" :options="stakeDistributionOptions" :series="stakeDistributionSeries"/>
    </md-content>
  </md-dialog>
</div>
</template>

<script>
export default {
  name: 'analyticsDialog',
  props: {
    open: Boolean,
    validators: Array,
  },
  data: function() {
    return {
      showDialog: this.open,
      commissionDistribution: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      nominatedDistribution: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      stakeDistribution: [0, 0, 0, 0, 0, 0, 0],
      commissionOptions: {
        chart: {
          id: 'commission-distribution'
        },
        xaxis: {
          categories: ['0%', '1%', '2%', '3%', '4%', '5%', '6%~10%', '11%~99%', '100%'],
        },
        title: {
          text: 'Commission Distribution'
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
              text: "Validator Count",
              style: {
                color: '#008FFB',
              }
            },
            seriesName: 'Validators'
          },
          {
            min: 0,
            show: false,
            seriesName: 'Validators'
          },
        ]
      },
      commissionSeries: [{
        name: 'Validators',
        data: this.commissionDistribution,
      }, {
        name: 'Actively Nominated',
        data: this.nominatedDistribution,
      }],
      stakeDistributionOptions: {
        chart: {
          id: 'stake-distribution'
        },
        title: {
          text: 'Stash distribution',
        },
        xaxis: {
          categories: ['0', '1+', '1K+', '5K+', '10K+', '20K+', '50K+'],
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
              text: "Validator Count",
              style: {
                color: '#008FFB',
              }
            },
            seriesName: 'Validators'
          },
        ]
      },
      stakeDistributionSeries: [{
        name: 'Validators dr',
        data: this.stakeDistribution,
      }],
    }
  },
  mounted: function() {
    this.updateCommissionDistribution();
    this.updateStakeDistribution();
  },
  methods: {
    onClose() {
      this.showDialog = false;
      this.$emit('close-guide');
    },
    updateStakeDistribution() {
      this.validators.forEach((v)=>{
        const inactiveKSM = v.inactiveKSM;
        if(inactiveKSM === 0) {
          this.stakeDistribution[0]++;
        }
        else if(inactiveKSM >= 1 && inactiveKSM <= 1000) {
          this.stakeDistribution[1]++;
        }
        else if(inactiveKSM >= 1001 && inactiveKSM <= 5000) {
          this.stakeDistribution[2]++;
        }
        else if(inactiveKSM >= 5001 && inactiveKSM <= 10000) {
          this.stakeDistribution[3]++;
        }
        else if(inactiveKSM >= 10001 && inactiveKSM <= 20000) {
          this.stakeDistribution[4]++;
        }
        else if(inactiveKSM >= 20001 && inactiveKSM <= 50000) {
          this.stakeDistribution[5]++;
        }
        else if(inactiveKSM >= 50001) {
          this.stakeDistribution[6]++;
        }
      });
      this.$refs['stake-distribution'].updateSeries([{
        data: this.stakeDistribution
      }], false, true);
    },
    updateCommissionDistribution() {
      this.validators.forEach((v)=>{
        const commission = v.info.commission;
        const exposure = v.info.exposure;
        if(commission < 1) { // 0%
          this.commissionDistribution[0]++;
          if(exposure.total > 0) {
            this.nominatedDistribution[0]++;
          }
        } else if(commission >= 1 && commission < 2) { // 1%
          this.commissionDistribution[1]++;
          if(exposure.total > 0) {
            this.nominatedDistribution[1]++;
          }
        } else if(commission >= 2 && commission < 3) { // 2%
          this.commissionDistribution[2]++;
          if(exposure.total > 0) {
            this.nominatedDistribution[2]++;
          }
        } else if(commission >= 3 && commission < 4) { // 3%
          this.commissionDistribution[3]++;
          if(exposure.total > 0) {
            this.nominatedDistribution[3]++;
          }
        } else if(commission >= 4 && commission < 5) { // 4%
          this.commissionDistribution[4]++;
          if(exposure.total > 0) {
            this.nominatedDistribution[4]++;
          }
        } else if(commission >= 5 && commission < 6) { // 5%
          this.commissionDistribution[5]++;
          if(exposure.total > 0) {
            this.nominatedDistribution[5]++;
          }
        } else if(commission >= 6 && commission <= 10) { // 6~10%
          this.commissionDistribution[6]++;
          if(exposure.total > 0) {
            this.nominatedDistribution[6]++;
          }
        } else if(commission > 10 && commission <= 99) { // 10~99%
          this.commissionDistribution[7]++;
          if(exposure.total > 0) {
            this.nominatedDistribution[7]++;
          }
        } else if(commission > 99 && commission <= 100) { // 100%
          this.commissionDistribution[8]++;
          if(exposure.length > 0) {
            this.nominatedDistribution[8]++;
          }
        }
      });
      this.$refs['commission-distribution'].updateSeries([{
        data: this.commissionDistribution
      }, {
        data: this.nominatedDistribution
      }], false, true);
    }
  },
}
</script>

<style lang="scss" scoped>
</style>