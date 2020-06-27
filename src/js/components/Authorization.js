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
        localStorage.setItem('userId', content.userId);
        document.querySelector('#closeSignUp').click();
    } else {
        document.querySelector('#passwordHelp2').innerHTML = 'Something went wrong. Perhaps the user with this email is already registered.!'
    }
};


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
    } else {
        document.querySelector('#warning').innerHTML = 'Wrong email or password!'
    }
};

const isValidEmail = (email) => {
    const regexp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    const emailHelp = document.querySelector('#emailHelp');
    
    if (email.match(regexp)) {
        emailHelp.innerHTML = '';
        return true;
    };
    emailHelp.innerHTML = 'Please, check your e-mail';
    return false;
}

const isValidPassword = (password) => {
    const regexp = /(?=.*[0-9])(?=.*[+\-_@$!%*?&#.,;:[\]{}])(?=.*[a-z])(?=.*[A-Z])[0-9+\-_@$!%*?&#.,;:{}[\]a-zA-Z]{8,}/g;
    const passwordHelp = document.querySelector('#passwordHelp');
    if (password.match(regexp)) {
        passwordHelp.innerHTML = '';
        return true;
    }
    passwordHelp.innerHTML = 'Please, check your password - it must contain at least 8 characters, at least one uppercase letter, one uppercase letter, one number and one special character.';
    return false;
}

const checkConfirmPassword = (password, confirmPassword) => {
    if (password === confirmPassword) {
        document.querySelector('#passwordHelp2').innerHTML = '';
        return true;
    }
    document.querySelector('#passwordHelp2').innerHTML = 'Password mismatch';
    return false;
}

const registration = () => {
    const email = document.querySelector('#InputEmail1').value;
    const password = document.querySelector('#InputPassword1').value;
    const confirmPassword = document.querySelector('#ConfirmPassword').value;
    if (isValidEmail(email) && isValidPassword(password) && checkConfirmPassword(password, confirmPassword)) {
        const user = {
            'email': email,
            'password': password,
        }        
        createUser(user);
    }
}

const signIn = () => {
    const email = document.querySelector('#InputEmail2').value;
    const password = document.querySelector('#InputPassword2').value;
    const user = {
        'email': email,
        'password': password,
    }        
    loginUser(user);
}

export { registration, signIn };