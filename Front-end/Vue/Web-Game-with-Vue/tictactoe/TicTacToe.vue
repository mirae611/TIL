<template>
  <div>
    <p>{{turn}}님의 턴입니다.</p>
    <table-component :table-data="tableData"></table-component>
    <p v-if="winner">{{winner}}님의 승리!</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "./store";
import TableComponent from './TableComponent';

export default {
  store,
  components: {
    TableComponent,
  },
  computed: {
    ...mapState(['tableData', 'winner', 'turn']),
  }
}
</script>

<style>
  table {
    border-collapse: collapse;
  }
  td {
    width: 40px;
    height: 40px;
    border: 1px solid black;
    text-align: center;
  }
</style>