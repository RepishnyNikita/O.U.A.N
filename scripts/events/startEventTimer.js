export default function startEventTimer(duration) {
    const timerEvent = document.querySelector('[data-js-event-timer]');
    let totalSecond = duration
    const interval =  setInterval(() => {
        const second = totalSecond % 60
        timerEvent.textContent = `${second < 10 ? '0' + second : second}`

        if(totalSecond-- <= 0) clearInterval(interval)
    }, 1000);
}

