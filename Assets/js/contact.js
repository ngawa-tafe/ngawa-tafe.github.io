const nameRegex = /^[A-Za-z\s]{2,50}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const form = document.getElementById('contactForm');
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');

const nameFeedback = document.getElementById('nameFeedback');
const emailFeedback = document.getElementById('emailFeedback');
const messageFeedback = document.getElementById('messageFeedback');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    if(!nameRegex.test(name.value.trim())) {
        nameFeedback.innerHTML = "Please enter a valid name";
        isValid = false;
    }
    else {
        nameFeedback.innerHTML = "";
    }
    if(!emailRegex.test(email.value.trim())) {
        emailFeedback.innerHTML = "Please enter a valid email";
        isValid = false;
    }
    else {
        emailFeedback.innerHTML = "";
    }
    if(message.value.trim().length < 2) {
        messageFeedback.innerHTML = "Please enter a valid message";
        isValid = false;
    }
    else {
        messageFeedback.innerHTML = "";
    }
    if (isValid){
        alert('Form submitted successfully!');
        form.reset()
    }

})