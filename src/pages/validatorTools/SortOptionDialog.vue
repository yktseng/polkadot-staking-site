<template>
<div id="sort-option-dialog">
  <md-dialog :md-active.sync="showDialog" @md-closed="onClose" class="sort-option-dialog" md-title="Sort">
    <md-dialog-title>Sort</md-dialog-title>
    <md-content>
      <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <md-field>
          <label for="movie">Sort By</label>
          <md-select v-model="sortOptions" name="sortBy" id="sortBy">
            <md-option value="default">Default</md-option>
            <md-option value="alphabetical">Alphabetical</md-option>
            <md-option value="apy">APY</md-option>
          </md-select>
        </md-field>
      </div>
      </div>
    </md-content>
    <md-dialog-actions>
      <md-button class="md-secodary" @click="showDialog = false">Close</md-button>
      <md-button class="md-primary" @click="onSave">Save</md-button>
    </md-dialog-actions>
  </md-dialog>
</div>
</template>

<script>
export default {
  name: 'sortOptionDialog',
  props: {
    open: Boolean,
  },
  data: function() {
    return {
      showDialog: this.open,
      sortOptions: 'alphabetical',
    }
  },
  mounted: async function() {
    console.log('123');
  },
  methods: {
    onClose() {
      this.showDialog = false;
      this.$emit('close-sorting-option');
    },
    onSave() {
      this.showDialog = false;
      this.$emit('close-sorting-option');
      this.$emit('sorting-option', {
        sortBy: this.sortOptions,
      });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>