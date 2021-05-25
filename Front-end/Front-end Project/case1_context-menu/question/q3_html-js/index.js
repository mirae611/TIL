// Import stylesheets
import "./style.css";

// Write Javascript code here!
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


