<template>
  <div>
      <h1>{{result}}</h1>
      <form @submit.prevent="onSubmitForm">
          <input type="text" ref="answer" maxlength="4" minlength="4" v-model="value">
          <button type="submit">입력</button>
      </form>
      <div>시도: {{tries.length}}</div>
      <ul>
          <li v-for="(t, i) in tries" :key="i">
              <p>{{t.try}}</p>
              <p>{{t.result}}</p>              
            </li>
      </ul>
  </div>
</template>

<script>
const getNumbers = () => {
    const candidates = [1, 2,3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i += 1) {
        const chosen = candidates.splice(Math.floor(Math.random() * ( 9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
};

export default {
    data: function() {
        return {
            answer: getNumbers(),
            tries: [],
            value: '',
            result: '',
        }
    },
    methods: {
        onSubmitForm(e) {
            // e.preventDefault();
            // this.tries.push(this.value);
            if(this.value === this.answer.join('')) {             
                this.tries.push({
                    try: this.value,
                    result: '홈런',
                });
                this.result= '축하합니다. 홈런이에요!';
                this.value = '';
                this.answer = getNumbers();
                this.tries = [];
                this.$refs.answer.focus();
            } else { //정답 틀렸을 때
                if (this.tries.length >= 9) {
                    this.result = `10번 넘게 틀려서 실패했어요ㅠㅠ! 답은 ${this.answer.join('')} 이었습니다.`
                    this.value = '';
                    this.answer = getNumbers();
                    this.tries = [];
                    this.$refs.answer.focus();
                } else {
                    // 화면과 관련이 있으면 data, 그냥 내부적으로 필요(계산 등)하다면 변수로
                    let strike = 0;
                    let ball = 0;
                    const answerArray = this.value.split('').map(v => parseInt(v));
                    for (let i = 0; i < 4; i += 1) {
                        if (answerArray[i] === this.answer[i]) { // 숫자 자릿수 모두 정답
                            strike++;
                        } else if (this.answer.includes(answerArray[i])) { // 숫자만 정답
                            ball++;
                        }
                    }
                    this.tries.push({
                        try: this.value,
                        result: `${strike} 스크라이트, ${ball} 볼입니다.`
                    });
                }
            }
            this.value = '';
            this.$refs.answer.focus();
        }
    }
}
</script>

<style>
</style>