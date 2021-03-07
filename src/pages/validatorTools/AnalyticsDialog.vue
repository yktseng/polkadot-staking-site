<template>
<div id="analytics-dialog">
  <md-dialog :md-active.sync="showDialog" @md-closed="onClose" class="analytics-dialog">
    <md-content>
      <div class="md-title">Commission Distribution</div>
      <apexchart ref="commission-distribution" id="commission-distribution" width="700" type="bar" :options="commissionOptions" :series="commissionSeries"/>
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
      commissionOptions: {
        chart: {
          id: 'commission-distribution'
        },
        xaxis: {
          categories: ['0%', '1%', '2%', '3%', '4%', '5%', '6%~10%', '11%~99%', '100%'],
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
            seriesName: 'Actively Nominated'
          },
        ]
      },
      commissionSeries: [{
        name: 'Validators',
        data: this.commissionDistribution,
      }, {
        name: 'Actively Nominated',
        data: this.nominatedDistribution,
      }]
    }
  },
  mounted: function() {
    // 10000000

    this.validators.forEach((v)=>{
      const commission = v.validatorPrefs.commission;
      if(commission < 1000000) { // 0%
        this.commissionDistribution[0]++;
        if(v.exposure !== undefined && v.exposure !== null) {
          if(v.exposure.total > 0) {
            this.nominatedDistribution[0]++;
          }
        }
      } else if(commission > 1000000 && commission <= 10000000) { // 1%
        this.commissionDistribution[1]++;
        if(v.exposure !== undefined && v.exposure !== null) {
          if(v.exposure.total > 0) {
            this.nominatedDistribution[1]++;
          }
        }
      } else if(commission > 10000000 && commission <= 20000000) { // 2%
        this.commissionDistribution[2]++;
        if(v.exposure !== undefined && v.exposure !== null) {
          if(v.exposure.total > 0) {
            this.nominatedDistribution[2]++;
          }
        }
      } else if(commission > 20000000 && commission <= 30000000) { // 3%
        this.commissionDistribution[3]++;
        if(v.exposure !== undefined && v.exposure !== null) {
          if(v.exposure.total > 0) {
            this.nominatedDistribution[3]++;
          }
        }
      } else if(commission > 30000000 && commission <= 40000000) { // 4%
        this.commissionDistribution[4]++;
        if(v.exposure !== undefined && v.exposure !== null) {
          if(v.exposure.total > 0) {
            this.nominatedDistribution[4]++;
          }
        }
      } else if(commission > 40000000 && commission <= 50000000) { // 5%
        this.commissionDistribution[5]++;
        if(v.exposure !== undefined && v.exposure !== null) {
          if(v.exposure.total > 0) {
            this.nominatedDistribution[5]++;
          }
        }
      } else if(commission > 50000000 && commission <= 100000000) { // 6~10%
        this.commissionDistribution[6]++;
        if(v.exposure !== undefined && v.exposure !== null) {
          if(v.exposure.total > 0) {
            this.nominatedDistribution[6]++;
          }
        }
      } else if(commission > 100000000 && commission <= 990000000) { // 10~99%
        this.commissionDistribution[7]++;
        if(v.exposure !== undefined && v.exposure !== null) {
          if(v.exposure.total > 0) {
            this.nominatedDistribution[7]++;
          }
        }
      } else if(commission > 990000000 && commission <= 1000000000) { // 100%
        this.commissionDistribution[8]++;
        if(v.exposure !== undefined && v.exposure !== null) {
          if(v.exposure.total > 0) {
            this.nominatedDistribution[8]++;
          }
        }
      }
    });
    this.$refs['commission-distribution'].updateSeries([{
        data: this.commissionDistribution
      }, {
        data: this.nominatedDistribution
      }], false, true);
  },
  methods: {
    onClose() {
      this.showDialog = false;
      this.$emit('close-guide');
    }
  },
}
</script>

<style lang="scss" scoped>
</style>