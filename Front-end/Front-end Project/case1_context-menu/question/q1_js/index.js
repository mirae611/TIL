// Write Javascript code here!

// 1. 초급
const items = document.querySelectorAll(".item");
items.forEach(function (item) {
  item.addEventListener("click", function (e) {
    item.classList.toggle("open");
    items.forEach(function (elem) {
      if (elem !== item) elem.classList.remove("open");
    });
  });
});


// 개선된 코드 1
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


// 개선된 코드 2
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


// 개선된 코드 2-2
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
