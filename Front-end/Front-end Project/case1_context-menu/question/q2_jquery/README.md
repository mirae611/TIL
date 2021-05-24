# Q1 - 2. 제이쿼리 (1)
- 목록을 클릭하면 해당 아이템에 대한 컨텍스트메뉴가 나타나고,
- 메뉴를 선택하거나 그 외의 부분을 클릭하면 사라지는
- 팝오버 컴포넌트를 구현하세요.
- 팝오버는 한 번에 하나만 보여야 합니다.  
　  
　  
　  
## SOLUTION

### Code 1
```javascript
const $wrapper = $(".wrapper");
const $items = $(".item");

$wrapper.on("click", ".item", function (e) { // '.item'이 e.target의 역할
  e.stopPropagation();
  $(this).toggleClass("open").siblings().removeClass("open");
});

$("body").on("click", function (e) {
  $items.removeClass("open");
});
```  
　  
　  
### Code 1-1
리스너 줄이기
```javascript
const $items = $(".item");

$("body").on("click", function (e) {
  const item = $(e.target);
  if (item.is(".item")) {
    item.toggleClass("open").siblings().removeClass("open");
  } else {
    $items.removeClass("open");
  }
});
```
