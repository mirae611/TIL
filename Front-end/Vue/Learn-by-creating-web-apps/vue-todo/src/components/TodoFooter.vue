<template>
  <div class="clear_all_container">
    <span class="clear_all_btn" @click="clearTodo">Clear All</span>
  </div>
</template>

<script>
export default {
  methods: {
    clearTodo: function() {
      localStorage.clear();   
    }
  }
}
</script>

<style scoped>
.clear_all_container {
  width: 8.5rem;
  height: 50px;
  margin: 0 auto;
  border-radius: 5px;
  background-color: #fff;
  line-height: 50px;
}
.clear_all_btn {
  display: block;
  color: #e20303;
}
</style>