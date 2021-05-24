// Import stylesheets
import "./style.css";
import $ from "jquery";

// Write JQuery code here!
// solution 1
const $wrapper = $(".wrapper");
const $items = $(".item");

$wrapper.on("click", ".item", function (e) {
  // '.item'이 e.target의 역할
  e.stopPropagation();
  $(this).toggleClass("open").siblings().removeClass("open");
});

$("body").on("click", function (e) {
  $items.removeClass("open");
});

// solution 1-1
// 리스너 줄이기
const $items = $(".item");

$("body").on("click", function (e) {
  const item = $(e.target);
  if (item.is(".item")) {
    item.toggleClass("open").siblings().removeClass("open");
  } else {
    $items.removeClass("open");
  }
});
