<template>
  <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
export default {
  props: {
    cellData: String,
    rowIndex: Number,
    cellIndex: Number
  },
  data() {
    return {
      
    }
  },
  methods: {
    onClickTd() {
      if (this.cellData) return;

      const rootData = this.$root.$data;
      let win = false;
      this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);

      if (rootData.tableData[this.rowIndex][0] === rootData.turn && rootData.tableData[this.rowIndex][1] === rootData.turn && rootData.tableData[this.rowIndex][2] === rootData.turn) {
        win = true;
      }
      if (rootData.tableData[0][this.cellIndex] === rootData.turn && rootData.tableData[1][this.cellIndex] === rootData.turn && rootData.tableData[2][this.cellIndex] === rootData.turn) {
        win = true;
      }
      if (rootData.tableData[0][0] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][2] === rootData.turn) {
        win = true;
      }
      if (rootData.tableData[0][2] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][0] === rootData.turn) {
        win = true;
      }

      if (win) { // 이긴 경우 : 3줄 달성
        rootData.winner = rootData.turn; // 승자 기록
        // 데이터 초기화
        rootData.turn = 'O';
        rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
      } else { //  무승부
        let all = true;
        rootData.tableData.forEach(row => { // 무승부 검사
          row.forEach(cell => {
            if(!cell) {
              all = false;
            }
          });
        });
        if (all) { // 무승부
          rootData.winner = '';
          rootData.turn = 'O';
          rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
        } else { // 아직 게임이 끝나지 않은 경우
          rootData.turn = rootData.turn === 'O' ? 'X' : 'O'; // 턴 바꿔주기
        }
      }
    }
  }
}
</script>

<style>

</style>