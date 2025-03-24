import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector("form");

form.addEventListener("submit", event => {
    event.preventDefault();
    const selected = form.elements.state.value;
    const delay = Number(form.elements.delay.value);
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (selected === 'fulfilled') {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            } else {
                reject(`❌ Rejected promise in ${delay}ms`);
            }
        }, delay);
    }).then(message => {
        iziToast.success({
            titleColor: '#ffffff',
            messageColor: '#ffffff',
            color: '#59A10D',
            pauseOnHover: false,
            timeout: 5000,
            iconUrl: '../img/bi_check2-circle.svg',
            title: 'OK',
            message: `Fulfilled promise in ${delay}ms`,
        });
    }).catch(message => {
            iziToast.error({
                titleColor: '#ffffff',
                messageColor: '#ffffff',
                color: '#EF4040',
                pauseOnHover: 'false',
                timeout: `5000`,
                iconUrl: '../img/bi_x-octagon.svg',
                title: 'Error',
                message: `Rejected promise in ${delay}ms`,
            });
    })
});