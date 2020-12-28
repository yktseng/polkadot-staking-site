<template>
  <div id="oneKValidator">
    <md-progress-bar md-mode="query" v-if="showProgressBar"></md-progress-bar>
    <md-table v-model="oneKVStatus" md-sort="name" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Kusama 1k validator info and status</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="rank" md-numeric md-sort-by="rank">{{ item.rank }}</md-table-cell>
        <md-table-cell md-label="electedRate" md-numeric md-sort-by="electedRate">{{ item.electedRate }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
const axios = require('axios');
export default {
  name: 'oneKValidator',
  data: function() {
    return {
      oneKVStatus: [],
      showProgressBar: false,
    }
  },
  mounted: async function() {
    this.showProgressBar = true;
    const result = await axios.get('https://kusama.yaohsin.net/api/onekvlist?rate=100');
    this.oneKVStatus = result.data;
    this.showProgressBar = false;
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #oneKValidator {
    height: 87vh;
  }
  tr:nth-child(even){
    background-color:#fafafa;
  }
  tr:nth-child(odd){
    background-color: #e7e7e7;
  }
</style>