<template>
  <div>
    <p>{{turn}}님의 턴입니다.</p>
    <table-component :table-data="tableData"></table-component>
    <p v-if="winner">{{winner}}님의 승리!</p>
  </div>
</template>

<script>
import TableComponent from './TableComponent';
import EventBus from './EventBus';

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
  },
  methods: {
    onClickTd(rowIndex, cellIndex) {
      let win = false;
      this.$set(this.tableData[rowIndex], cellIndex, this.turn);

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
        this.winner = this.turn; // 승자 기록
        // 데이터 초기화
        this.turn = 'O';
        this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
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
          this.winner = '';
          this.turn = 'O';
          this.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
        } else { // 아직 게임이 끝나지 않은 경우
          this.turn = this.turn === 'O' ? 'X' : 'O'; // 턴 바꿔주기
        }
      }
    }
  },
  created() {
    EventBus.$on('clickTd', this.onClickTd);
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