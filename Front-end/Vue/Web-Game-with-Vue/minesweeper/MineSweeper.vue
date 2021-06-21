<template>
  <div>
    <mine-form></mine-form>
    <p>{{timer}}</p>
    <table-component></table-component>
    <p>{{result}}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store, { INCREMENT_TIMER } from "./store";
import MineForm from "./MineForm";
import TableComponent from "./TableComponent";

let interval;
export default {
  store,
  components: {
    TableComponent,
    MineForm,
  },
  computed: {
    ...mapState(['timer', 'result', 'halted'])
  },
  methods: {
  },  
  watch: {
    halted(value, oldvalue) {
      if (value === false) { // false일 때 게임 시작
        interval = setInterval(() => {
          this.$store.commit(INCREMENT_TIMER);
        }, 1000);
      } else { // 게임 중단
        clearInterval(interval);
      }
    },
  },
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
    cursor: default;
  }
</style>