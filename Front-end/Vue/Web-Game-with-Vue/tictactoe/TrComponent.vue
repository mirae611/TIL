<template>
  <tr>
    <td-component v-for="(cellData, index) in rowData" :cell-index="index" :row-index="rowIndex" :key="index" ></td-component>
  </tr>
</template>

<script>
import TdComponent from "./TdComponent";

export default {
  components: {
    TdComponent,
  },
  props: {
    rowIndex: Number,
  },
  data() {
    return {
      parent: '내가 부모임!'
    }
  },
  computed: {
    rowData() {
      // props: { rowData: Array }
      return this.$store.state.tableData[this.rowIndex];
    }
  }
}
</script>

<style>

</style>