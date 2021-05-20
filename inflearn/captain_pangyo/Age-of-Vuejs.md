- [인스턴스](#chapter-1)
- [컴포넌트](#chapter-2)
- [컴포넌트 통신 방법 - 기본](#chapter-3)
- [컴포넌트 통신 방법 - 응용](#chapter-4)
- [라우터](#chapter-5)
- [HTTP 통신 라이브러리 - axios](#chapter-6)
- [템플릿 문법 - 기본](#chapter-7)
- [템플릿 문법 - 실전](#chapter-8)
- 프로젝트 생성 도구 - Vue CLI
- 싱글 파일 컴포넌트
- 최종 프로젝트 - 사용자 입력 폼 만들기  

### 인스턴스<a id="chapter-1"></a>

```javascript
var vm = new Vue({
    el: '#app',
    data: {
        message: 'hi'
    },
    methods: {
        
    }
});
```
   
   
### 컴포넌트<a id="chapter-2"></a>

```html
<div id="app">
    <app-header></app-header>
    <app-content></app-content>
    <app-footer></app-footer>
</div>
<div id="app2">
    <app-header></app-header>
    <app-content></app-content>
    <app-footer></app-footer>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    // 전역 컴포넌트
    Vue.component('app-header', {
        template: '<h1>Header</h1>'
    });
    Vue.component('app-content', {
        template: '<div>Content</div>'
    });
    new Vue({
        el: '#app',
        components: { // 지역 컴포넌트
            'app-footer': {
                template: '<footer>Footer</footer>'
            }
        }
    });
    new Vue({
        el: '#app2'
    })
</script>
```

### 컴포넌트 통신 방법 - 기본<a id="chapter-3"></a>
#### props
```html
<div id="app">
    <app-header :propsdata="message"></app-header>
    <app-content :propsnum="num"></app-content>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    var appHeader = {
        template: '<h1>{{ propsdata }}</h1>',
        props: ['propsdata']
    }
    var appContent = {
        template: '<div>{{ propsnum }}</div>',
        props: ['propsnum']
    }

    new Vue({
        el: '#app',
        components: { // 지역 컴포넌트
            'app-header': appHeader,
            'app-content': appContent
        },
        data: {
            message: 'hi',
            num: 10
        }
    });
</script>
```

#### emit
```html
<div id="app">
    <app-header @pass="logText"></app-header>
    <app-content @count="countNumber"></app-content>
    <p>count : {{ num }}</p>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    var appHeader = {
        template: '<button @click="passEvent">click me!</button>',
        methods: {
            passEvent: function() {
                this.$emit('pass');
            }
        }
    }
    var appContent = {
        template: '<button @click="addNumber">add</button>',
        methods: {
            addNumber: function() {
                this.$emit('count');
            }
        }
    }
    new Vue({
        el: '#app',
        components: {
            'app-header': appHeader,
            'app-content': appContent
        },
        methods: {
            logText: function() {
                console.log('hi');
            },
            countNumber: function() {
                this.num++;
                console.log(this.num);
            }
        },
        data: {
            num: 0
        }
    });
</script>
```

### 컴포넌트 통신 방법 - 응용<a id="chapter-4"></a>

```html
<div id="app">
    <app-header :propsdata="num"></app-header>
    <app-content @pass="deliverNum"></app-content>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    var appHeader = {
        props: ['propsdata'],
        template: '<div>header</div>'
    }
    var appContent = {
        template: '<div>content<button @click="passNum">pass</button></div>',
        methods: {
            passNum: function() {
                this.$emit('pass', 10);
            }
        }
    }
    new Vue({
        el: '#app',
        components: {
            'app-header': appHeader,
            'app-content': appContent
        },
        data: {
            num: 0
        },
        methods: {
            deliverNum: function(value) {
                this.num = value;
            }
        }
    });
</script>
```

### 뷰 라우터<a id="chapter-5"></a>
뷰 라우터는 뷰 라이브러리를 이용하여 싱글 페이지 애플리케이션을 구현할 때 사용하는 라이브러리

```html
<div id="app">
    <div>
        <router-link to="/login">Login</router-link>
        <router-link to="/main">Main</router-link>
    </div>
    <router-view></router-view>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router@2.0.0/dist/vue-router.js"></script>
<script>
    var LoginComponenet = {
        template: '<div>login</div>'
    }
    var MainComponent = {
        template: '<div>main</div>'
    }

    var router = new VueRouter({
        // routes에는 페이지의 라우팅 정보
        routes: [
            {
                // path: url
                path: '/login',
                // component: 해당 url에 표시될 component
                component: LoginComponenet
            },
            {
                path: '/main',
                component: MainComponent
            }
        ]
    });

    new Vue({
        el: '#app',
        router: router,
        components: {}
    });
</script>
```

### HTTP 통신 라이브러리 - axios<a id="chapter-6"></a>
참고자료 - [axios](https://github.com/axios/axios)

```html
<div id="app">
    <button @click="getData">get user</button>
    <div>
        {{ users }}
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
    new Vue({
        el: '#app',
        data: {
            users: []
        },
        methods: {
            getData: function() {
                var vm = this;
                // jsonplaceholder라는 것은 rest api라고해서 js로 api를 요청할 때 테스트 해볼 수 있는 사이트
                axios.get('https://jsonplaceholder.typicode.com/users')
                .then(function (response) {
                    console.log(response.data);
                    vm.users = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }
    });
</script>
```

### 템플릿문법 - 기본<a id="chapter-7"></a>
참고자료 - [axios](https://github.com/axios/axios)

```html
<div id="app">
    <!-- 데이터 바인딩 -->
    <p :id="uuid" :class="name">{{ num }}</p>

    <p>{{ doubleNum }}</p>
    <!-- v- if는 DOM을 제거, show는 DOM은 유지 -->
    <div v-if="loading">
        Loading...
    </div>
    <div v-else>
        test user has benn logged in
    </div>
    <div v-show="loading">
        Loading...
    </div>
    <input type="text" v-model="message">
    <p>Message is: {{ message }}</p>
    <button @click="logText">Click Me</button>
    <input type="text" @keyup.enter='logText'>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    new Vue({
        el: '#app',
        data: {
            num: 10,
            uuid: 'abc1234',
            name: 'text-blue',
            loading: true,
            message: ''
        },
        computed: {
            doubleNum: function() {
                return this.num * 2;
            }
        },
        methods: {
            logText: function() {
                console.log('clicked');
            }
        }
    });
</script>
```   
   
### 템플릿문법 - 실전<a id="chapter-8"></a>
#### watch
```html
<div id="app">
		{{num}}
		<button @click="addNum">increase</button>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
		new Vue({
				el: '#app',
				data: {
						num: 10
				},
				watch: {
						num: function() {
								this.logText();
						}
				},
				methods: {
						addNum: function(){
								this.num++;
						},
						logText: function(){
								console.log('changed');
						}
				}
		});
</script>
```
#### watch와 computed
computed
- 단순한 값에 대한 계산에 사용한다.
watch
- 무거운 로직에 사용한다. 무거운 로직은 매번 사용되기는 부담되는 동작등을 말한다. 
- 데이터 요청에 적합하다.

```html
<div id="app">
		{{num}}
</div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
		new Vue({
				el: '#app',
				data: {
						num: 10
				},
				computed: {
						doubleNum: function () {
								return this.num * 2;
						}
				},
				watch: {
						num: function (newValue, oldValue) {
								this.fetchUserByNumber(newValue);
						}
				},
				methods: {
						fetchUserByNumber: function (num) {
								console.log(num);
								// axios.get(num);
						}
				}
		});
</script>
```
#### computed의 활용
```html
<div id="app">
		<p :class="{warning: isError}">Hello</p>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
		new Vue({
				el: '#app',
				data: {
						isError: false
				},
				computed: {
						errorTextColor: function() {
								return this.isError ? 'warning' : null;
						}
				}
		});
</script>
```
