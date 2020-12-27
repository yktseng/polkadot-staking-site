<template>
  <div id="oneKValidator">
    <md-table v-model="oneKVStatus" md-sort="name" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Kusama 1k validators</h1>
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
      oneKVStatus: []
    }
  },
  mounted: async function() {
    const result = await axios.get('https://kusama.yaohsin.net/api/onekvlist?rate=30');
    this.oneKVStatus = result.data;
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #oneKValidator {
    height: 87vh;
  }
</style>