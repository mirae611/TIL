<template>
  <div id="rock-paper-scissors">
    <div id="computer" :style="computedStyleObject"></div>
    <div>
      <button @click="onClickButton('가위')" style="font-size: 60px">✌🏻</button>
      <button @click="onClickButton('바위')" style="font-size: 60px">✊🏻</button>
      <button @click="onClickButton('보')" style="font-size: 60px">🖐🏻</button>
    </div>
    <p>{{ result }}</p>
    <p>현재 {{ score }}점</p>
  </div>
</template>

<script>
const rpsCoords = {
  바위: "-15px",
  가위: "-136px",
  보: "-284px",
};
const scores = {
  가위: 0,
  바위: 1,
  보: -1,
};
const computerChoice = (imgCoord) => {
  return Object.entries(rpsCoords).find((v) => v[1] === imgCoord)[0];
};
let interval = null;

export default {
  data() {
    return {
      imgCoord: rpsCoords.가위,
      result: "",
      score: 0,
    };
  },
  computed: {
    computedStyleObject() {
      return {
        background: `url(http://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`,
      };
    },
  },
  methods: {
    changeHand() {
      interval = setInterval(() => {
        if (this.imgCoord === rpsCoords.가위) {
          this.imgCoord = rpsCoords.바위;
        } else if (this.imgCoord === rpsCoords.바위) {
          this.imgCoord = rpsCoords.보;
        } else if (this.imgCoord === rpsCoords.보) {
          this.imgCoord = rpsCoords.가위;
        }
      }, 100);
    },
    onClickButton(choice) {
      clearInterval(interval);
      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(this.imgCoord)];
      const diff = myScore - cpuScore;
      if (diff === 0) {
        this.result = "비겼습니다.";
      } else if ([1, -2].includes(diff)) {
        this.result = "이겼습니다.";
        this.score++;
      } else {
        this.result = "졌습니다.";
        this.score--;
      }
      setTimeout(() => {
        this.changeHand();
      }, 1000);
    },
  },
  mounted() {
    this.changeHand();
  },
  beforeDestroy() {
    clearInterval(interval);
  },
};
</script>

<style scoped>
#rock-paper-scissors {
  text-align: center;
}
#computer {
  width: 148px;
  height: 200px;
  margin: 0 auto 20px;
}
</style>