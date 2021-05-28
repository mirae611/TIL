<template>
  <div class="input_box shadow">
    <input type="text" v-model="newTodoItem" @keyup.enter="addTodo">
    <!-- <button @click="addTodo">add</button> -->
    <span class="add_container" @click="addTodo"><i class="fas fa-plus add_btn"></i></span>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      newTodoItem: '',
    }    
  },
  methods: {
    addTodo: function() {
      // console.log(this.newTodoItem);
      if (this.newTodoItem !== '') {
        let obj = {completed: false, item: this.newTodoItem};
        localStorage.setItem(this.newTodoItem, JSON.stringify(obj));
        this.clearInput();
      }
    },
    clearInput: function() {
      this.newTodoItem = '';
    }
  }
}
</script>

<style scoped>
input:focus {
  outline: none;
}
.input_box {
  background-color: #fff;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.input_box input {
  border-style: none;
  font-size: 0.9rem;
}
.add_container {
  display: block;
  float: right;
  width: 3rem;
  border-radius: 0 5px 5px 0;
  background: linear-gradient(to right, #6478fb, #8763fb);
}
.add_btn {
  color: #fff;
  vertical-align: middle;
}
</style>