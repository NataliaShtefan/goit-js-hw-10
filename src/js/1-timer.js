import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";



const input = document.querySelector("#datetime-picker");
const btn = document.querySelector("button[data-start]");
const daysSpan = document.querySelector("[data-days]");
const hoursSpan= document.querySelector("[data-hours]");
const minutesSpan = document.querySelector("[data-minutes]");
const secondsSpan = document.querySelector("[data-seconds]");

let userSelectedDate;
let intervalId;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        if (userSelectedDate <= new Date()) {
            window.alert("Please choose a date in the future");
            btn.disabled = true;
        } else {
            btn.disabled = false;
        }
    },
  };
  

flatpickr("#datetime-picker", options);



btn.addEventListener('click', () => {
    btn.disabled = true;
    input.disabled = true;

    intervalId = setInterval(() => {
        const nowTime = new Date();
        const timeDifference = userSelectedDate - nowTime;

        if (timeDifference <= 0) {
            clearInterval(intervalId);
            updateTimer(0);
            input.disabled = false;
        } else {
            updateTimer(timeDifference);
        }
    }, 1000);
});


function updateTimer(ms) {
    const { days, hours, minutes, seconds } = convertMs(ms);
    daysSpan.textContent = addLeadingZero(days);
    hoursSpan.textContent = addLeadingZero(hours);
    minutesSpan.textContent = addLeadingZero(minutes);
    secondsSpan.textContent = addLeadingZero(seconds);

}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart( 2, "0");
}