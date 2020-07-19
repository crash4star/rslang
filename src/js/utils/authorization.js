import renderMainPage from '../main page/mainPage';

const mailOptions = {
    regExp: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
    errorMessage: 'Please, check your e-mail',
}

const passwordOptions = {
    regExp: /(?=.*[0-9])(?=.*[+\-_@$!%*?&#.,;:[\]{}])(?=.*[a-z])(?=.*[A-Z])[0-9+\-_@$!%*?&#.,;:{}[\]a-zA-Z]{8,}/g,
    errorMessage: 'Please, check your password - it must contain at least 8 characters, at least one uppercase letter, one uppercase letter, one number and one special character.',
}

const URL = 'https://afternoon-falls-25894.herokuapp.com';

const confirmPasswordErrorMessage = 'Password mismatch';
const authorizationErrorMessage = 'Wrong email or password!';
const loginIsNotFreeMessage = 'Something went wrong. Perhaps the user with this email is already registered!';

const loginUser = async user => {
    const rawResponse = await fetch(`${URL}/signin`, {
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
        localStorage.setItem('refreshToken', content.refreshToken);
        localStorage.setItem('userId', content.userId);
        localStorage.setItem('login', user.email.substr(0, user.email.indexOf('@')));
        renderMainPage();
    } else {
        document.querySelector('#signInPasswordSmall').innerHTML = authorizationErrorMessage;
    }
};

const createUser = async user => {
    const rawResponse = await fetch(`${URL}/users`, {
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
    } else {
        document.querySelector('#signUpConfirmPasswordSmall').innerHTML = loginIsNotFreeMessage;
    }
};

const checkStatementByUsingRegex = (value, expression) => {
    return value.match(expression);
}

const isMatchedRegEpxAndShowMessage = (email, messageNode, options) => {
    const statement = checkStatementByUsingRegex(email, options.regExp);
    messageNode.innerText = (statement) ? '' : options.errorMessage;
    return !!statement;
}

const isValidEmail = (email, messageNode) => {
    return isMatchedRegEpxAndShowMessage (email, messageNode, mailOptions);
}

const isValidPassword = (password, messageNode) => {
    return isMatchedRegEpxAndShowMessage (password, messageNode, passwordOptions);
}

const checkConfirmPassword = (password, confirmPassword, messageNode) => {
    messageNode.innerText = (password === confirmPassword) ? '' : confirmPasswordErrorMessage;
    return !messageNode.innerText;
}

const registration = () => {
    const email = document.querySelector('#signUpEmailInput').value.toLowerCase();
    const messageForEmail = document.querySelector('#signUpEmailSmall');

    const password = document.querySelector('#signUpPasswordInput').value;
    const messageForPassword = document.querySelector('#signUpPasswordSmall');

    const confirmPassword = document.querySelector('#signUpConfirmPasswordInput').value;
    const messageForConfirmPasssword = document.querySelector('#signUpConfirmPasswordSmall');

    if (isValidEmail(email, messageForEmail) && isValidPassword(password, messageForPassword) && checkConfirmPassword(password, confirmPassword, messageForConfirmPasssword)) {
        const user = {
            'email': email,
            'password': password,
        }        
        createUser(user);
    }
}

const signIn = () => {
    const email = document.querySelector('#signInEmailInput').value.toLowerCase();
    const messageForEmail = document.querySelector('#signInEmailSmall');
    
    const password = document.querySelector('#signInPasswordInput').value;
    const messageForPassword = document.querySelector('#signInPasswordSmall');

    if (isValidEmail(email, messageForEmail) && isValidPassword(password, messageForPassword)) {
        const user = {
            'email': email,
            'password': password,
        }        
        loginUser(user);
    }
}

const signOut = () => {
    localStorage.removeItem('login');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
}

const refreshToken = async () => {
    const id = localStorage.getItem('userId');
    const token = localStorage.getItem('refreshToken');
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${id}/tokens`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
    if (rawResponse.status === 200) {
        const content = await rawResponse.json();
        localStorage.setItem('token', content.token);
        localStorage.setItem('refreshToken', content.refreshToken);
        return true;
    }
        signOut();
        return false;
}

export { registration, signIn, signOut, refreshToken };