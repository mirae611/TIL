
<template>
  <div>
    <div id="screen" :class="state" @click="onClickScreen">{{message}}</div>
    <template v-show="result.length">
      <p>평균 시간: {{average}}ms</p>
      <button @click="onReset">리셋</button>
    </template>
  </div>
</template>

<script>
let startTime = 0;
let endTime = 0;
let timeout = 0;
export default {
  data: function() {
    return {
      result: [],
      state: 'waiting',
      message: '클릭해서 시작하세요.'
    }
  },
  computed: {
    average: function() {
      return this.result.reduce((a, c) => a + c, 0) / this.result.length || 0
    }
  },
  methods: {
    onReset: function() {
      this.result = [];
    },
    onClickScreen: function() {
      if (this.state === 'waiting') {
        this.state = 'ready';
        this.message = '초록색이 되면 클릭하세요.';
        timeout = setTimeout(() => {
          this.state = 'now';
          this.message = '지금 클릭!';
          startTime = new Date();
        }, Math.floor(Math.random() * 1000) + 2000); // 2~3초
      } else if (this.state === 'ready') {
        clearTimeout(timeout);
        this.state = 'waiting';
        this.message = '너무 성급하시군요! 초록색이 된 후에 클릭하세요.';
      } else if (this.state === 'now') {
        endTime = new Date();
        this.state = 'waiting';
        this.message = '클릭해서 시작하세요.';
        this.result.push(endTime - startTime);
      }
    }
  }
}
</script>

<style scoped>
  #screen {
    width: 300px;
    height: 200px;
    text-align: center;
    user-select: none;
  }
  #screen.waiting {
    background-color: aqua;
  }
  #screen.ready {
    background-color: red;
    color: #fff;
  }
  #screen.now {
    background-color: greenyellow;
  }
</style>