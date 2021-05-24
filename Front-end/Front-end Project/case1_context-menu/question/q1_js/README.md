# Q1 - 1. 자바스크립트 (1)
- 목록을 클릭하면 해당 아이템에 대한 컨텍스트메뉴가 나타나고,
- 메뉴를 선택하거나 그 외의 부분을 클릭하면 사라지는
- 팝오버 컴포넌트를 구현하세요.
- 팝오버는 한 번에 하나만 보여야 합니다.  
　  
　  
　  
## SOLUTION

### 초급
```javascript
const items = document.querySelectorAll(".item");
items.forEach(function (item) {
  item.addEventListener("click", function (e) {
    item.classList.toggle("open");
    items.forEach(function (elem) {
      if (elem !== item) elem.classList.remove("open");
    });
  });
});
```
**문제점**
- 이벤트 감지 대상이 너무 많음
    - 성능 저하로 이어짐
    - list가 고정되어있지않고 계속 변화할 수도 있음  
　  
　  
### 개선된 코드 1
```javascript
const wrapper = document.querySelector(".wrapper");
const items = document.querySelectorAll(".item");

wrapper.addEventListener("click", function (e) {
  const targetElem = e.target;
  console.dir(e);
  if (!targetElem.classList.contains("item")) return;
  targetElem.classList.toggle("open");
  items.forEach(function (elem) {
    if (elem !== targetElem) elem.classList.remove("open");
  });
});
```  
- 이벤트 리스너의 등록은 가급적 최소화 하는것이 좋음
- 이벤트의 bubbling과 capturing을 정확히 이해해야 함
    - 이 예제에서 wrapper에 click event를 등록했는데 어떻게 안쪽에있는 대상을 클릭한것이 동작이 될까?  
    클릭이벤트가 버블링이 이루어지기 때문.  
    wrapper가 item보다 상위에 있는 DOM형태로, item에서 click event가 발생하면 bubbling에 의해서 wrapper까지 전달된다.  
    wrapper에 전달되는 순간 click event가 발생.  
    실제로 클릭이 일어난 곳은 e.target인 item으로 되어있음.  
　  
　  
### 개선된 코드 2
```javascript
const wrapper = document.querySelector(".wrapper");
const items = document.querySelectorAll(".item");

wrapper.addEventListener("click", function (e) {
  const targetElem = e.target;
  e.stopPropagation(); // 확산방지, 이거 없으면 body에 이벤트때문에 바로 닫혀버림
  if (!targetElem.classList.contains("item")) return;
  targetElem.classList.toggle("open");
  items.forEach(function (elem) {
    if (elem !== targetElem) elem.classList.remove("open");
  });
});
```  
　  
메뉴 외 부분을 클릭하면 사라지게하는 기능 추가
```javascript
document.body.addEventListener("click", function (e) {
  if (e.target.classList.contains("context")) return;
  items.forEach(function (elem) {
    elem.classList.remove("open");
  });
});
```  
　  
**최종코드**
```javascript
const wrapper = document.querySelector(".wrapper");
const items = document.querySelectorAll(".item");

wrapper.addEventListener("click", function (e) {
  const targetElem = e.target;
  e.stopPropagation(); // 확산방지, 이거 없으면 body에 이벤트때문에 바로 닫혀버림
  if (!targetElem.classList.contains("item")) return;
  targetElem.classList.toggle("open");
  items.forEach(function (elem) {
    if (elem !== targetElem) elem.classList.remove("open");
  });
});

document.body.addEventListener("click", function (e) {
  if (e.target.classList.contains("context")) return;
  items.forEach(function (elem) {
    elem.classList.remove("open");
  });
});
```  
　  
　  
### 개선된 코드 2-2
앞서 리스너를 최소한으로 만드는 것이 좋다고 설명했기때문에,   
리스너는 한개로 줄여보는 작업
```javascript
const items = document.querySelectorAll(".item");

document.body.addEventListener("click", function (e) {
  const targetClassList = e.target.classList;
  if (targetClassList.contains("context")) return;
  if (targetClassList.contains("item")) {
    targetClassList.toggle("open");
    items.forEach(function (elem) {
      if (elem !== e.target) elem.classList.remove("open");
    });
    return;
  }
  items.forEach(function (elem) {
    elem.classList.remove("open");
  });
});
```
**장점**
- 리스너가 줄어듦  
  
**단점**
- 조건문들이 많아짐
    - 이 조건문을 최적화할 수 있는 방법을 고민할 필요 있음 
- body전체에 리스너를 걸었기 때문에 이 페이지의 동작이 전부 종료되기 전까지는 하나의 이벤트 리스너에 전적으로 의존할 수 밖에 없음
    - 각각 이벤트 리스너를 등록한 것(개선된 코드 2)에 비해 관리가 어려움
    




    


