const body = document.querySelector('body');
const IMG_NUMBER = 5;
init();

function handleImageLoad() {}

function paintImage(imgNumber) {
    const image = new Image();
    const imgURL = `images/${imgNumber + 1}.jpg`
    body.style.background = `url(${imgURL}) no-repeat 50% 50% / cover`;
    image.addEventListener('load', handleImageLoad);
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}