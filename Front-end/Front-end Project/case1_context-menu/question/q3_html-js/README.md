# Q1 - 3. 자바스크립트 (2)
- 목록을 클릭하면 해당 아이템에 대한 컨텍스트메뉴가 나타나고,
- 메뉴를 선택하거나 그 외의 부분을 클릭하면 사라지는
- 팝오버 컴포넌트를 구현하세요.
- 팝오버는 한 번에 하나만 보여야 합니다.  
　  
　  
　  
## SOLUTION
```javascript
const items = document.querySelectorAll('details');

document.body.addEventListener('click', function (e) {
    if (e.target.nodeName !== 'p' || e.target.nodeName !== 'SUMMARY') {
        items.forEach(function (item) {
            item.removeAttribute('open');
        });
    }
    items.forEach(function (item) {
        if (item !== e.target.parentElement) {
            item.removeAttribute('open');
        }
    });
});
``` 
**details 사용 시 장점**
- html의 details 태그는 클릭하면 대상을 열림 상태로 바꾸고 내용을 보여준다
- html에서 제공하는 기본적인 동작을 사용하기 때문에 좀 더 효율적이며,
- js로 구현한 동작보다 성능이 더 좋을 것이고, 동작에 대한 신뢰도도 높다
- js가 제대로 동작하지 않는 상황에서도 원활하게 동작할 수 있다
