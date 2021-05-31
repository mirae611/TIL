<template>
  <div>
    <ul>
      <li v-for="(todoItem, i) in todoItems" :key="i" class="shadow">
        <i class="check_btn fas fa-check" :class="{check_btn_completed: todoItem.completed}" @click="toggleComplete(todoItem)"></i>
        <span :class="{text_completed: todoItem.completed}">{{ todoItem.item }}</span>
        <span class="remove_btn" @click="removeTodo(todoItem, index)"><i class="fas fa-trash-alt"></i></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: [],
  data: function() {
    return {
      todoItems: [],
    }
  },
  methods: {
    removeTodo: function (todoItem, index) {
      // console.log(todoItem, index)
      localStorage.removeItem(todoItem);
      this.todoItems.splice(index, 1);
    },
    toggleComplete: function(todoItem) {
      todoItem.completed = !todoItem.completed;
      // localStrage 데이터를 갱신
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    }
  },
  created: function() { // 인스턴스가 생성되자마자 실행되는 life cycle hook
    // console.log('created');
    if(localStorage.length > 0) {
      for(let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
          this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0;
  margin-top: 0;
  text-align-last: left;
}
li {
  display: flex;
  height: 50px;
  min-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  border-radius: 5px;
  background-color: #fff;
  line-height: 50px;
}
.remove_btn {
  margin-left: auto;
  color: #de4343;
}
.check_btn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.check_btn_completed {
  color: #b3adad;
}
.text_completed {
  text-decoration: line-through;
  color: #b3adad;
}
</style>