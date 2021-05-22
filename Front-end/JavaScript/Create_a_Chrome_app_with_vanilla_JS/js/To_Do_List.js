const toDoContainer = document.querySelector(".toDoContainer");
    toDoForm = toDoContainer.querySelector("#js-toDoForm");
    toDoInput = toDoForm.querySelector("#toDoInput");
    toDofoldBtn = document.querySelector('#toDoListBtn'); 
    pendingList = document.querySelector("#js-pendingList");
    finishedList = document.querySelector("#js-finishedList");
const PENDING = "pending";
    FINISHED = "finished";
let pendingItems = [];
    finishedItems = [];
    listFold = true;

init();

function handleFoldClick(e) {
    const btn = e.target;
    listFold = !listFold;
    if (listFold) {
       btn.classList.remove('unfold');
       btn.classList.add('fold');
    } else {
       btn.classList.remove('fold');
       btn.classList.add('unfold');
    }
    toDoListFold();
}

toDofoldBtn.addEventListener('click', handleFoldClick);

function toDoListFold() {
     if (listFold) {
        toDoContainer.classList.remove('unfold');
        toDoContainer.classList.add('fold');
     } else {
        toDoContainer.classList.remove('fold');
        toDoContainer.classList.add('unfold');
     }
}

function getItemObject(text) {
    return {
        id: String(Date.now()),
        text
    };
}

function savePending(item) {
    pendingItems.push(item);
}

function findInFinished(itemId) {
    return finishedItems.find(function (item) {
        return item.id === itemId;
    });
}

function findInPending(itemId) {
    return pendingItems.find(function (item) {
        return item.id === itemId;
    });
}

function removeFromPending(itemId) {
    pendingItems = pendingItems.filter(function (item) {
        return item.id !== itemId;
    });
}

function removeFromFinished(itemId) {
    finishedItems = finishedItems.filter(function (item) {
        return item.id !== itemId;
    });
}

function addToFinished(item) {
    finishedItems.push(item);
}

function addToPending(item) {
    pendingItems.push(item);
}

function deleteItem(e) {
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    removeFromFinished(li.id);
    removeFromPending(li.id);
    saveToDos();
}

function handlecompleteClick(e) {
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    const item = findInPending(li.id);
    removeFromPending(li.id);
    addToFinished(item);
    paintFinished(item);
    saveToDos();
}

function handleBackClick(e) {
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    const item = findInFinished(li.id);
    removeFromFinished(li.id);
    addToPending(item);
    paintPending(item);
    saveToDos();
}

function buildListItem(item) {
    console.log(item);
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    span.innerText = `- ${item.text}`;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteItem);
    li.append(span);
    li.append(delBtn);
    li.id = item.id;
    return li;
}

function paintFinished(item) {
    const li = buildListItem(item);
    const backBtn = document.createElement("button");
    backBtn.innerText = "⏪";
    backBtn.addEventListener("click", handleBackClick);
    li.append(backBtn);
    finishedList.append(li);
}

function paintPending(item) {
    const li = buildListItem(item);
    const completeBtn = document.createElement("button");
    completeBtn.innerText = "✔";
    completeBtn.addEventListener("click", handlecompleteClick);
    li.append(completeBtn);
    pendingList.append(li);
}

function restoreToDos() {
    pendingItems.forEach(e => paintPending(e));
    finishedItems.forEach(e => paintFinished(e));
}

function saveToDos() {
    localStorage.setItem(PENDING, JSON.stringify(pendingItems));
    localStorage.setItem(FINISHED, JSON.stringify(finishedItems));
}

function loadToDos() {
    pendingItems = JSON.parse(localStorage.getItem(PENDING)) || [];
    finishedItems = JSON.parse(localStorage.getItem(FINISHED)) || [];
}

function handleSubmit(e) {
    e.preventDefault();
    const itemObj = getItemObject(toDoInput.value);
    toDoInput.value = '';
    paintPending(itemObj);
    savePending(itemObj);
    saveToDos();
}

function init() {
    toDoForm.addEventListener("submit", handleSubmit);
    loadToDos();
    restoreToDos();
    toDoListFold();
}