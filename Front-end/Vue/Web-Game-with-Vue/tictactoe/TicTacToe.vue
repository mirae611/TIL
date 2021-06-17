<template>
  <div>
    <p>{{turn}}님의 턴입니다.</p>
    <table-component>
      <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
        <td @click="onClickTd(rowIndex, cellIndex)" v-for="(cellData, cellIndex) in rowData" :key="cellIndex">{{cellData}}</td>
      </tr>
    </table-component>
    <p v-if="winner">{{winner}}님의 승리!</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store, { SET_WINNER, CLICK_CELL, CHANGE_TURN, RESET_GAME, NO_WINNER } from "./store";
import TableComponent from "./TableComponent";

export default {
  store,
  components: {
    TableComponent,
  },
  computed: {
    ...mapState(['tableData', 'winner', 'turn']),
  },
  methods: {
    onClickTd(rowIndex, cellIndex) {
      if (this.cellData) return;

      let win = false;
      this.$store.commit(CLICK_CELL, { row: rowIndex, cell: cellIndex });

      if (this.tableData[rowIndex][0] === this.turn && this.tableData[rowIndex][1] === this.turn && this.tableData[rowIndex][2] === this.turn) {
        win = true;
      }
      if (this.tableData[0][cellIndex] === this.turn && this.tableData[1][cellIndex] === this.turn && this.tableData[2][cellIndex] === this.turn) {
        win = true;
      }
      if (this.tableData[0][0] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][2] === this.turn) {
        win = true;
      }
      if (this.tableData[0][2] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][0] === this.turn) {
        win = true;
      }

      if (win) { // 이긴 경우 : 3줄 달성
        this.$store.commit(SET_WINNER, this.turn);
        this.$store.commit(RESET_GAME);
      } else { //  무승부
        let all = true;
        this.tableData.forEach(row => { // 무승부 검사
          row.forEach(cell => {
            if(!cell) {
              all = false;
            }
          });
        });
        if (all) { // 무승부
          this.$store.commit(NO_WINNER);
          this.$store.commit(RESET_GAME);
        } else { // 아직 게임이 끝나지 않은 경우
          this.$store.commit(CHANGE_TURN);
        }
      }
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