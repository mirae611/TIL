const clockContainer = document.querySelector('.js-clock');
    clockTitle = clockContainer.querySelector('p');
    timeGreeting = document.querySelector('#js-timeGreetings');
init();

function GreetingsByTime(hours) {
    let greetingMsg = 'Good ';
    hours = parseInt(hours, 10);
    if (hours < 5) {
        greetingMsg += 'Night';
    } else if (hours < 12) {
        greetingMsg += 'Morning';
    } else if (hours < 18) {
        greetingMsg += 'Afternoon';
    } else if (hours < 22) {
        greetingMsg += 'Evening';
    }
    timeGreeting.innerText = greetingMsg;
}

function getTime() {
    const date = new Date();
    hours = date.getHours();
    minuites = date.getMinutes();
    seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minuites < 10 ? `0${minuites}` : minuites}:${seconds < 10 ? `0${seconds}` : seconds}`;
    GreetingsByTime(hours);
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}