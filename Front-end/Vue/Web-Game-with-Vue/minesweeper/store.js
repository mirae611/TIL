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
  OPENED: 0, // 0 이상이면 다 opened
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
    halted: true,
    result: '',
    openedCount: 0,
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
      state.halted = false;
      state.openedCount = 0;
      state.result = '';
    },                                                                                                                                                                                                                                                                                                                                                                                                                          
    [OPEN_CELL](state, {row, cell}) {
      let openedCount = 0;
      const checked = [];
      function checkAround(row, cell) { //오픈했을 때 주변 8칸의 지뢰 검색
        const checkRowOrCellIsUndefined =  row < 0 || row >= state.tableData.length || cell < 0 || cell >= state.tableData[0].length;
        if (checkRowOrCellIsUndefined) {
          return;
        }
        if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(state.tableData[row][cell])) {
          return;
        }
        if (checked.includes(row + '/' + cell)) {
          return;
        } else {
          checked.push(row + '/' + cell)
        }
        let around = [];
        // 이런 코드 굳이 간결하게 쓰려고 하지 않아도 된다.
        // 이게 간결하게 쓰는 것도 좋지만 이런식으로 두면 가독성이 좋아져서 한눈에 이 코드가 하고있는게 뭔지 알 수 있다.
        if (state.tableData[row - 1]) {
          around = around.concat([
            state.tableData[row - 1][cell - 1], state.tableData[row - 1][cell], state.tableData[row - 1][cell + 1]
          ]);
        }
        around = around.concat([
          state.tableData[row][cell - 1], state.tableData[row][cell + 1]
        ]);
        if (state.tableData[row + 1]) {        
          around = around.concat([
            state.tableData[row + 1][cell - 1], state.tableData[row + 1][cell], state.tableData[row + 1][cell + 1]
          ]);
        }
        const counted = around.filter(v => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v));
        // return counted.length;
        if (counted.length === 0 && row > -1) {
          const near = [];
          if (row - 1 > -1) {
            near.push([row - 1, cell - 1]);
            near.push([row - 1, cell]);
            near.push([row - 1, cell + 1]);
          };
          near.push([row, cell - 1]);
          near.push([row, cell + 1]);
          if (row + 1 < state.tableData.length) {
            near.push([row + 1, cell - 1]);
            near.push([row + 1, cell]);
            near.push([row + 1, cell + 1]);
          };
          near.forEach(n => {
            if (state.tableData[n[0]][n[1]] !== CODE.OPENED) {
              checkAround(n[0], n[1]);
            }
          });
        }
        if (state.tableData[row][cell] === CODE.NORMAL) {
          openedCount += 1;
        }        
        Vue.set(state.tableData[row], cell, counted.length);
      }
      checkAround(row, cell);
      // state.datat.row * state.data.cell - state.data.mine : 지뢰를 제외한 cell 개수
      // state.openedCount + openedCount : 지금까지 열린 cell + 지금 열린 cell
      // 두개가 같다는 의미를 지뢰를 제외한 모든 cell을 open했다는 의미 : 승리
      let halted = false;
      let result = '';
      if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
        halted = true;
        result = `${state.timer}초만에 승리하셨습니다.`;
      }
      state.openedCount += openedCount;
      state.halted = halted;
      state.result = result;
    },
    [CLICK_MINE](state, {row, cell}) { // 지뢰 밟은 경우
      state.halted = true; // 게임 종료
      Vue.set(state.tableData[row], cell, CODE.CLICKED_MINE);
    },
    [FLAG_CELL](state, {row, cell}) {
      if(state.tableData[row][cell] === CODE.MINE) {
        Vue.set(state.tableData[row], cell, CODE.FLAG_MINE);
      } else {
        Vue.set(state.tableData[row], cell, CODE.FLAG);
      }
    },
    [QUESTION_CELL](state, {row, cell}) {
      if(state.tableData[row][cell] === CODE.FLAG_MINE) {
        Vue.set(state.tableData[row], cell, CODE.QUESTION_MINE);
      } else {
        Vue.set(state.tableData[row], cell, CODE.QUESTION);
      }
    },
    [NORMALIZE_CELL](state, {row, cell}) {      
      if(state.tableData[row][cell] === CODE.QUESTION_MINE) {
        Vue.set(state.tableData[row], cell, CODE.MINE);
      } else {
        Vue.set(state.tableData[row], cell, CODE.NORMAL);
      }
    },
    [INCREMENT_TIMER](state) {
      state.timer++;
    },
  },
  actions: {

  }
});