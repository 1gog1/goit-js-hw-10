import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";
import iconError from '../img/x-octagon.svg';


let userSelectedDate = null;
let calculateTime = null;

const startButton = document.querySelector('[data-start]');
const dateTimeInput = document.querySelector('#datetime-picker');
startButton.disabled = true;


const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {

        userSelectedDate = selectedDates[0];
        // console.log(`Початкова дата: ${new Date()}`);
        // console.log(`Кінцева дата: ${selectedDates[0]}`);


        if (selectedDates[0] < new Date()) {
            startButton.disabled = true;
            iziToast.error({
                titleColor: '#ffffff',
                messageColor: '#ffffff',
                color: '#EF4040',
                pauseOnHover: false,
                timeout: 5000,
                iconUrl: iconError,
                title: 'Error',
                message: `Please choose a date in the future`,
            });
        } else {
            startButton.disabled = false;
            calculateTime = selectedDates[0] - new Date();
            writingTime(convertMs(calculateTime));
        }
    },
};

const datetimePicker = flatpickr('#datetime-picker', options);
// console.log("🚀 ~ datetimePicker:", datetimePicker)


startButton.addEventListener('click', event => {
    startButton.disabled = true;
    dateTimeInput.disabled = true;

    const timeCalculate = setInterval(() => {
        const timeLeft = userSelectedDate - new Date();

        if (timeLeft <= 0) {
            clearInterval(timeCalculate);

            iziToast.success({
                title: 'Success',
                message: 'Countdown finished!'
            });
            dateTimeInput.disabled = false;
            return;
        }

        writingTime(convertMs(timeLeft));
    }, 1000);
});



function writingTime({days, hours, minutes, seconds}) {
    dataDays.textContent = String(days).padStart(2, '0');
    dataHours.textContent = String(hours).padStart(2, '0');
    dataMinutes.textContent = String(minutes).padStart(2, '0');
    dataSeconds.textContent = String(seconds).padStart(2, '0');
};

