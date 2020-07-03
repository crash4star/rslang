import renderPage from '../index';
import { clearMarkup } from '../utils/utils';
import renderMainPage from '../main page/mainPage';

const loginUser = async user => {
    const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (rawResponse.status === 200) {
        const content = await rawResponse.json();
        document.querySelector('#closeSignIn').click();
        localStorage.setItem('token', content.token);
        localStorage.setItem('userId', content.userId);
        localStorage.setItem('login', user.email.substr(0, user.email.indexOf('@')));
        clearMarkup();
        renderMainPage();
    } else {
        document.querySelector('#warning').innerHTML = 'Wrong email or password!'
    }
};


const createUser = async user => {
    const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/users', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (rawResponse.status === 200) {
        const content = await rawResponse.json();
        localStorage.setItem('userId', content.id);
        document.querySelector('#closeSignUp').click();
        await loginUser(user);
        renderPage();
    } else {
        document.querySelector('#signUpConfirmPasswordSmall').innerHTML = 'Something went wrong. Perhaps the user with this email is already registered!'
    }
};

const isValidEmail = (email, selector) => {
    const regexp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    const signUpEmailSmall = document.querySelector(selector);
    
    if (email.match(regexp)) {
        signUpEmailSmall.innerHTML = '';
        return true;
    };
    signUpEmailSmall.innerHTML = 'Please, check your e-mail';
    return false;
}

const isValidPassword = (password, selector) => {
    const regexp = /(?=.*[0-9])(?=.*[+\-_@$!%*?&#.,;:[\]{}])(?=.*[a-z])(?=.*[A-Z])[0-9+\-_@$!%*?&#.,;:{}[\]a-zA-Z]{8,}/g;
    const signUpPasswordInput = document.querySelector(selector);
    if (password.match(regexp)) {
        signUpPasswordInput.innerHTML = '';
        return true;
    }
    signUpPasswordInput.innerHTML = 'Please, check your password - it must contain at least 8 characters, at least one uppercase letter, one uppercase letter, one number and one special character.';
    return false;
}

const checkConfirmPassword = (password, confirmPassword) => {
    if (password === confirmPassword) {
        document.querySelector('#signUpConfirmPasswordInput').innerHTML = '';
        return true;
    }
    document.querySelector('#signUpConfirmPasswordSmall').innerHTML = 'Password mismatch';
    return false;
}

const registration = () => {
    const email = document.querySelector('#signUpEmailInput').value.toLowerCase();
    const password = document.querySelector('#signUpPasswordInput').value;
    const confirmPassword = document.querySelector('#signUpConfirmPasswordInput').value;
    if (isValidEmail(email, '#signUpEmailSmall') && isValidPassword(password, '#signUpPasswordSmall') && checkConfirmPassword(password, confirmPassword)) {
        const user = {
            'email': email,
            'password': password,
        }        
        createUser(user);
    }
}

const signIn = () => {
    const email = document.querySelector('#signInEmailInput').value.toLowerCase();
    const password = document.querySelector('#signInPasswordInput').value;
    if (isValidEmail(email, '#signInEmailSmall' ) && isValidPassword(password, '#signInPasswordSmall')) {
        const user = {
            'email': email,
            'password': password,
        }        
        loginUser(user);
    }
}

const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    renderPage();
}

export { registration, signIn, signOut };