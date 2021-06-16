import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex); // Vue와 Vuex 연결

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

export default new Vuex.Store({
  state: { // vue의 data와 비슷
    tableData: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    turn: 'O', // O, X
    winner: '',
  },
  getters: { // vue의 computed와 비슷
    // computed와 비슷하다는 것은 캐싱도 되고, 기존의 state를 활용한 추가적인 작업을 할 때
    turnMessage() {
      return state.turn + '님이 승리하셨습니다.';
    }
  },
  mutations: { // state를 수정할 떄 사용, 동기적으로
    [SET_WINNER](state, winner) { // mutations의 함수명은 대문자로 지어야 함(약속임)
      state.winner = winner;
    },
    [CLICK_CELL](state, {row, cell}) {
      // state.tableData[row][cell] = state.turn; // index로 접근하는 경우는 data만 바뀌고 화면은 바뀌지 않음
      Vue.set(state.tableData[row], cell, state.turn); // 배열을 index로 접근하여 수정하는 경우에 사용하는 방법: vue불러오기,  Vue.set(object, key, value);
    },
    [CHANGE_TURN](state) {
      state.turn = state.turn === 'O' ? 'X' : 'O';
    },
    [RESET_GAME](state) {
      state.turn = 'O';
      state.tableData = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ]
    },
    [NO_WINNER](state) {
      state.winner = '';      
    }
  },
  actions: { // 비동기르 사용할 때, 또는 여러 mutations을 연달아 실행할 때

  }
});