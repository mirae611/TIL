<template>
  <div>
    <p>{{turn}}님의 턴입니다.</p>
    <table-component :table-data="tableData"></table-component>
    <p v-if="winner">{{winner}}님의 승리!</p>
  </div>
</template>

<script>
import TableComponent from './TableComponent';

export default {
  components: {
    TableComponent,
  },
  data() {
    return {
      tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      turn: 'O', // O, X
      winner: '',
    }
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