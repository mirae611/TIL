### 인스턴스

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


### 컴포넌트

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

### 컴포넌트 통신 방법 - 기본
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

### 컴포넌트 통신 방법 - 응용

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

### 뷰 라우터
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


