const userForm = document.querySelector('#js-userForm');
    userInput = userForm.querySelector('#userInput');
    nameGreeting = document.querySelector('#js-nameGreetings');
const USER_LS = "currentUSer";
    SHOWING_CN = 'showing';

init();

function hideInput() {
    userInput.style.display = "none";
}

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = userInput.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    userForm.classList.add(SHOWING_CN);
    userForm.addEventListener("submit", handleSubmit)
}

function paintGreeting(text) {
    userForm.classList.remove(SHOWING_CN);
    console.log(userForm.classList);
    nameGreeting.classList.add(SHOWING_CN);
    nameGreeting.innerText = `, ${text}님❤`;
    hideInput();
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    } else {
        hideInput();
        paintGreeting(currentUser)
    }
}

function init() {
    loadName();
}