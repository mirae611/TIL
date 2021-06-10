<template>
  <div>
    <p>당첨 숫자</p>
    <div id="result">
      <lotto-ball v-for="(ball, i) in winBalls" :key="i"></lotto-ball>
    </div>
    <p>보너스!</p>
    <lotto-ball v-if="bonus"></lotto-ball>
    <button v-if="redo">한 번 더!</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      winBalls: [],
      bonus: null,
      redo: false,
    }
  }
}
</script>

<style>

</style>