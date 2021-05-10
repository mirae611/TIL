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

```javascript
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
```javascript
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
```javascript
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


