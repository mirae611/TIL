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
import store from "./store";
import TableComponent from "./TableComponent";
import MineForm from "./MineForm";

export default {
  store,
  components: {
    TableComponent,
    MineForm,
  },
  computed: {
    ...mapState(['timer', 'result'])
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