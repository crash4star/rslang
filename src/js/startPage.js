import addElement from './utils/addElement';
import { progressiveLearningData, team } from './data/startPage';
import renderHeader from './components/header';
import renderFooter from './components/footer';

const body = document.querySelector('body');

function renderHero () {
    const hero = addElement('div', body, 'hero');
    const container = addElement('div', hero, 'container');
    const heroDescription = addElement('div', container);
    addElement('h2', heroDescription, null, null, 'Learning just got easier');
    addElement('p', heroDescription, null, null, 'Choose your favourite game and start learning English today');
    addElement('button', heroDescription, 'btn btn-danger', null, 'Get started', ['type', 'button'], ['data-toggle', 'modal'], ['data-target', '#signin']);

    addElement('img', container, 'hero-image', null, null, ['src', 'img/startPage/hero-image.png'], ['alt', 'hero image']);
}

function renderProgressive() {
    const progressive = addElement('div', body, 'progressive');   
    const container = addElement('div', progressive, 'container');
    addElement('h3', container, null, null, 'Progressive learning');
    const row = addElement('div', container, 'row');
    progressiveLearningData.forEach(element => {
        const col = addElement('div', row, 'col-xl-3 col-md-6 col-12 progressive-item');
        addElement('img', col, null, null, null, ['src', `img/startPage/${element.img}.png`], ['alt', element.img]);
        addElement('h2', col, null, null, element.title);
        addElement('p', col, null, null, element.description);
    });
}

function renderAbout() {
    const about = addElement('div', body, 'progressive');   
    const container = addElement('div', about, 'container');
    addElement('h3', container, null, null, 'About us');
    addElement('p', container, null, null, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.');
    const row = addElement('div', container, 'row');
    team.forEach(element => {
        const col = addElement('div', row, 'col-xl-4 col-md-6 col-12 progressive-item');
        const user = addElement('div', col, 'user card');
        addElement('h4', user, null, null, element.name);
        let contact = addElement('div', user, 'contact');
        addElement('div', contact, 'skype');
        addElement('a', contact, null, null, element.skype, ['href', `skype:${element.skype}?call`]);
        contact = addElement('div', user, 'contact');
        addElement('div', contact, 'gmail');
        addElement('a', contact, null, null, element.email, ['href', `mailto:${element.email}`]);
        
        addElement('img', user, null, null, null, ['src', `img/startPage/${element.skype}.png`], ['alt', 'user photo']);
    });
}

function renderSignUp() {
    const modalFade = addElement('div', body, 'modal fade', 'signup', null, ['tabindex', '-1'], ['role', 'dialog'], ['aria-labelledby', 'ModalLabel'], ['aria-hidden', 'true']);
    const modalDialog = addElement('div', modalFade, 'modal-dialog');
    const modalContent = addElement('div', modalDialog, 'modal-content');
    const modalHeader = addElement('div', modalContent, 'modal-header');
    addElement('h5', modalHeader, 'modal-title', 'ModalLabel', 'Sign Up');
    const closeButton = addElement('button', modalHeader, 'close', null, null, ['data-dismiss', 'modal'], ['aria-label', 'Close']);
    addElement('span', closeButton, null, null, '&times;', ['aria-hidden', 'true']);

    const modalBody = addElement('div', modalContent, 'modal-body');
    const form = addElement('form', modalBody);
    let formGroup = addElement('div', form, 'form-group');
    addElement('label', formGroup, null, null, 'Email address', ['for', 'InputEmail1']);
    addElement('input', formGroup, 'form-control', 'InputEmail1', null, ['type', 'email'], ['aria-describedby', 'emailHelp']);
    addElement('small', formGroup, 'form-text text-muted', 'emailHelp', 'We\'ll never share your email with anyone else.');

    formGroup = addElement('div', form, 'form-group');
    addElement('label', formGroup, null, null, 'Password', ['for', 'InputPassword1']);
    addElement('input', formGroup, 'form-control', 'InputPassword1', null, ['type', 'password']);
    addElement('small', formGroup, 'form-text text-muted', 'emailHelp2', 'Password must contain at least 8 characters, at least one uppercase letter, one uppercase letter, one number and one special character.');

    formGroup = addElement('div', form, 'form-group');
    addElement('label', formGroup, null, null, 'Confirm password', ['for', 'ConfirmPassword']);
    addElement('input', formGroup, 'form-control', 'ConfirmPassword', null, ['type', 'password']);

    const modalFooter = addElement('div', modalContent, 'modal-footer');
    addElement('button', modalFooter, 'btn btn-success', null, 'Register', ['type', 'button']);
    addElement('button', modalFooter, 'btn btn-danger', null, 'Close', ['type', 'button'], ['data-dismiss', 'modal']);
}

function renderSignIn() {
    const modalFade = addElement('div', body, 'modal fade', 'signin', null, ['tabindex', '-1'], ['role', 'dialog'], ['aria-labelledby', 'ModalLabel'], ['aria-hidden', 'true']);
    const modalDialog = addElement('div', modalFade, 'modal-dialog');
    const modalContent = addElement('div', modalDialog, 'modal-content');
    const modalHeader = addElement('div', modalContent, 'modal-header');
    addElement('h5', modalHeader, 'modal-title', 'ModalLabel', 'Sign In');
    const closeButton = addElement('button', modalHeader, 'close', null, null, ['data-dismiss', 'modal'], ['aria-label', 'Close']);
    addElement('span', closeButton, null, null, '&times;', ['aria-hidden', 'true']);

    const modalBody = addElement('div', modalContent, 'modal-body');
    const form = addElement('form', modalBody);
    let formGroup = addElement('div', form, 'form-group');
    addElement('label', formGroup, null, null, 'Email address', ['for', 'InputEmail2']);
    addElement('input', formGroup, 'form-control', 'InputEmail2', null, ['type', 'email'], ['aria-describedby', 'emailHelp']);
    
    formGroup = addElement('div', form, 'form-group');
    addElement('label', formGroup, null, null, 'Password', ['for', 'InputPassword2']);
    addElement('input', formGroup, 'form-control', 'InputPassword2', null, ['type', 'password']);
    
    const modalFooter = addElement('div', modalContent, 'modal-footer');
    addElement('button', modalFooter, 'btn btn-success', null, 'Sign in', ['type', 'button']);
    addElement('button', modalFooter, 'btn btn-danger', null, 'Close', ['type', 'button'], ['data-dismiss', 'modal']);
}

export default function renderStartPage () {
    renderHeader();
    renderHero();
    renderProgressive();
    renderAbout();
    renderFooter();
    renderSignUp();
    renderSignIn();
}