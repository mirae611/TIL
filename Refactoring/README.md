# REFACTORING

## Chapter01 리팩터링: 첫 번째 예시

## Chapter02 리팩터링 원칙

## Chapter03 코드에서 나는 악취

## Chapter04 테스트 구축하기

## Chapter05 리팩터링 카탈로그 보는 법

## Chapter06 기본적인 리팩터링

### 3.17 메시지 체인 Message Chains

```javascript
managerName = aPerson.department.manager.name;
```

```javascript
managerName = aPerson.department.managerName;
managerName = aPerson.manager.name;
managerName = aPerson.managerName;
```

```javascript
managerName = aPerson.department.manager.name;
report = `${managerName}께
${aPerson.name}님의 작업 로그 ...`;
console.log(report);
```

```javascript
console.log(reportAutoGenerator.report(aPerson));
```

## Chapter04 테스트 구축하기

### 4.2 테스트할 샘플 코드

```javascript
class Province {
    constuctor(doc) {
        this._name = doc.name;
        this._producers = [];
        this._totalProduction = 0;
        this._demand = doc.demand;
        this._price = doc.price;
        doc.producers.forEach((d) => this.addProducer(new Producer(this, d)));
    }

    addProducer(arg) {
        this._producers.push(arg);
        this._totalProduction += arg.production;
    }

    get name() { return this._name; }
    get producers() { return this._producers.slice(); }
    get totalProduction() { return this._totlaProduction; }
    set totalProduction(arg) { this._totalProduction = arg; }
    get demand() { return this._demand; }
    set demand(arg) { this.demand = parseInt(arg); } // 숫자로 파싱해서 저장
    get price() { return this._price; }
    set price(arg) { this.price = parseInt(arg); } // 숫자로 파싱해서 저장

    // 생산 부족분을 계산하는 코드
    get shortfall() { return this._demand - this.totalProduction; }

    // 수익을 계산하는 코드
    get profit() { return this.demandValue - this.demandCost; }
    get demandValue() { return this.satisfiedDemand * this.price; }
    get satisfiedDemand() { return Math.min(this.demand, this.totalProduction); }
    get demandCost() {
        let remainingDemand = this.demand;
        let result = 0;
        this.producers
            .sort((a, b) => a.cost - b.cost)
            .forEach((p) => {
                const contribution = Math.min(remainingDemand, p.prodution);
                remainingDemand -= contribution;
                result += contribution * p.cost;
            });
        return result;
    }
}

class Producer {
    constructor(aProvince, data) {
        this._province = aProvince;
        this._cost = data.cost;
        this._name = data.name;
        this._production = data.production || 0;
    }

    get name() { return this._name; }
    get cost() { return this._cost; }
    set cost(arg) { this._cost = parseInt(arg); }
    get production() { return this._production; }
    set production(amountStr) {
        const amount = parseInt(amountStr);
        const newProduction = Number.isNaN(amount) ? 0 : amount;
        this._province.totalProduction += newProduction - this._production;
        this.production = newProduction;
    }
}

function sampleProvinceData() {
    return {
        name: 'Asia',
        producers: [
            {
                name: 'Byzantium',
                cost: 10,
                production: 9,
            },
            {
                name: 'Attalia',
                cost: 12,
                production: 10,
            },
            {
                name: 'Sinope',
                cost: 10,
                production: 6,
            },
        ],
        demand: 30,
        price: 20,
    };
}
```

### 4.3 첫 번째 테스트
**mocha로 테스트하기**
- 설치
    ```bash
    npm install mocha -g
    ```

- 테스트하기
    ```bash
    mocha
    ```
    - 폴더 지정해서 테스트하기  
        ![image](https://user-images.githubusercontent.com/45534877/119459271-7dd88880-bd78-11eb-99c2-5838f9283082.png)
        ```bash
        mocha Refactoring
        ```
- 테스트 완료  
    ![image](https://user-images.githubusercontent.com/45534877/119459981-2981d880-bd79-11eb-86a9-2e33c68f181c.png)  
　  

**테스트 코드**
```javascript
describe('province', function() {
    it('shorfall', function() {
        const asia = new Province(sampleProvinceData()); // 픽스처 설정
        assert.equal(asia.shortfall, 5); // 검증
    });
});
```


## Chapter06 기본적인 리팩터링
### 6.1 함수 추출하기
```javascript
function printOwing(invoice) {
    printBanner();
    let outstanding = calculateOutstanding();

    // 세부 사항 출력
    console.log('고객명: ${invoice.customer}');
    console.log('채무액: ${outstanding}}');
}
```
**절차**
1. 함수를 새로 만들고 목적을 잘 드러내는 이름을 붙인다.
```javascript
function printOwing(invoice) {
    printBanner();
    let outstanding = calculateOutstanding();

    // 세부 사항 출력
    function printDetails() {} // --------- 1

    console.log('고객명: ${invoice.customer}');
    console.log('채무액: ${outstanding}}');
}
```
2. 추출할 코드를 원본 함수에서 복사하여 새 함수에 붙여넣는다.
```javascript
function printOwing(invoice) {
    printBanner();
    let outstanding = calculateOutstanding();

    // 세부 사항 출력
    function printDetails() {
        console.log('고객명: ${invoice.customer}'); // --------- 2
        console.log('채무액: ${outstanding}}'); // --------- 2
    }
}
```
3. 추출한 코드 중 원본 함수의 지역 변수를 참조하거나 추출한 함수의 유효범위를 벗어나는 변수는 없는지 검사한다. 있다면 매개변수로 전달한다.
```javascript
function printOwing(invoice) {
    printBanner();
    let outstanding = calculateOutstanding();

    // 세부 사항 출력
    function printDetails(outstanding) { // --------- 3
        console.log('고객명: ${invoice.customer}');
        console.log('채무액: ${outstanding}}');
    }
}
```
4. 변수를 다 처리해다면 컴파일한다.
5. 원본 함수에서 추출한 코드 부분을 새로 만든 함수를 호출하는 문장으로 바꾼다.
```javascript
function printOwing(invoice) {
    printBanner();
    let outstanding = calculateOutstanding();
    printDetails(outstanding); // --------- 5

    // 세부 사항 출력
    function printDetails(outstanding) {
        console.log('고객명: ${invoice.customer}');
        console.log('채무액: ${outstanding}}');
    }
}
```
6. 테스트
7. 다른 코드에 방금 추출한 것과 똑같거나 비슷한 코드가 없는지 살핀다. 있다면 방금 추출한 새 함수를 호출하도록 바꿀지 검토한다.
