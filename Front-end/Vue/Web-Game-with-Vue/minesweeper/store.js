import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPEMED: 0, // 0 이상이면 다 opened
}
//위에 코드 예시
// -1이면 그냥 빈칸
// -7이면 지뢰있는거
// 칸을 열면 0 이상으로 주변 지뢰의 갯수를 표시 // 예 : (1,2)에 표시된 2
// [
//   ['-7', '2', '-1'],
//   ['-7', '-1', '-1'],
//   ['-1', '-7', '-1'],
// ]

const plantMine = (row, cell, mine) => {
  const candidata = Array(row * cell).fill().map((arr, i) => i);
  const shuffle = [];
  while (candidata.length > row * cell - mine) {
    const chosen = candidata.splice(Math.floor(Math.random() * candidata.length), 1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);    
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  return data;
}

export default new Vuex.Store({
  state: {
    tableData: [],
    data: {
      row: 0,
      cell: 0,
      mine: 0
    },
    timer: 0,
    result: '',
  },
  getters: {

  },
  mutations: {
    [START_GAME](state, {row, cell, mine}) {
      state.data = {
        row,
        cell,
        mine
      };
      // state.data.row = row;
      // 객제 내부의 데이터를 바로 접근해서 수정할 수 없다.
      // Vue.set(state.data, 'row', row); 이렇게 사용해야 수정이 가능
      // 우리는 data의 property가 아닌 data전체를 수정하기 때문에 Vue.set()을 사용하지 않아도 된다.
      state.tableData = plantMine(row, cell, mine);
      state.timer = 0;
    },
    [OPEN_CELL]() {},
    [CLICK_MINE]() {},
    [FLAG_CELL]() {},
    [QUESTION_CELL]() {},
    [NORMALIZE_CELL]() {},
    [INCREMENT_TIMER]() {},
  },
  actions: {

  }
});