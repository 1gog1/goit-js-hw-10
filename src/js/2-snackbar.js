import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import iconSuccess from "../img/check-circle-fill.svg";
import iconError from "../img/x-octagon.svg";


const form = document.querySelector("form");

form.addEventListener("submit", event => {
    event.preventDefault();
    const selected = form.elements.state.value;
    const delay = Number(form.elements.delay.value);
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (selected === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    }).then(delay => {
        iziToast.success({
            titleColor: '#ffffff',
            messageColor: '#ffffff',
            color: '#59A10D',
            pauseOnHover: false,
            timeout: 5000,
            iconUrl: iconSuccess,
            title: 'OK',
            message: `Fulfilled promise in ${delay}ms`,
        });
    }).catch(delay => {
        iziToast.error({
            titleColor: '#ffffff',
            messageColor: '#ffffff',
            color: '#EF4040',
            pauseOnHover: 'false',
            timeout: `5000`,
            iconUrl: iconError,
            title: 'Error',
            message: `Rejected promise in ${delay}ms`,
        });
    });
});