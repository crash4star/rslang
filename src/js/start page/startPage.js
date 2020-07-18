import '../../css/start_page.scss';
import addElement, { clearMarkup } from '../utils/utils';
import { progressiveLearningData, aboutUs, team } from '../data/startPage';
import renderHeader from '../components/header';
import renderFooter from '../components/footer';
import { registration, signIn } from '../utils/authorization';

const body = document.querySelector('body');
const command = team;

function renderHero () {
    const hero = addElement('div', body, 'hero');
    const container = addElement('div', hero, 'container');
    const heroDescription = addElement('div', container, 'hero-description');
    addElement('h2', heroDescription, null, null, 'Learning just got easier');
    addElement(
        'p', 
        heroDescription, 
        null, 
        null, 
        'Choose your favourite game and start learning English today'
    );
    addElement(
        'button', 
        heroDescription, 
        'btn btn-red', 
        null, 
        'Get started', 
        ['type', 'button'], 
        ['data-toggle', 'modal'], 
        ['data-target', '#signin']
    );
    addElement(
        'img', 
        container, 
        'hero-image', 
        null, 
        null, 
        ['src', 'img/startPage/hero-image.png'], 
        ['alt', 'hero image']
    );
}

function renderProgressive() {
    const progressive = addElement('div', body, 'progressive');   
    const container = addElement('div', progressive, 'container');
    addElement('h3', container, null, null, 'Progressive learning');
    const row = addElement('div', container, 'row');
    progressiveLearningData.forEach(element => {
        const col = addElement('div', row, 'col-xl-3 col-md-6 col-12 progressive-item');
        addElement(
            'img', 
            col, 
            null, 
            null, 
            null, 
            ['src', `img/startPage/${element.img}.png`], 
            ['alt', element.img]
        );
        addElement('h2', col, null, null, element.title);
        addElement('p', col, null, null, element.description);
    });
}

function addContactField (parent, type, contact) {
    const field = addElement('div', parent, 'contact');
    if (contact.length > 1) {
        addElement('div', field, type);
        let link;
        if (type === 'skype') {
            link = `skype:${contact}?call`;
        } else {
            link = `mailto:${contact}`;
        }
        addElement('a', field, null, null, contact, ['href', link]);
    }
}

function renderAbout() {
    const about = addElement('div', body, 'about');   
    const container = addElement('div', about, 'container');
    addElement('h3', container, null, null, 'About us');
    addElement('p', container, null, null, aboutUs);
    const row = addElement('div', container, 'row');
    const shuffledTeam = (function shuffle(array) {
        const shuffledArray = [];
        while (array.length > 0) {
            shuffledArray.push(array.splice(Math.floor(Math.random() * array.length), 1)[0]);
        }
        return shuffledArray;
    })(command);
    shuffledTeam.forEach(element => {
        const col = addElement('div', row, 'col-xl-4 col-md-6 col-12 progressive-item');
        const user = addElement('div', col, 'user card');
        addElement('h4', user, null, null, element.name);
        let photoFileName = 'noPhoto';
        let altForPhoto = 'image without photo'
        if (element.name !== 'NO DATA') {
            addContactField(user, 'skype', element.skype);
            addContactField(user, 'gmail', element.email);
            photoFileName = element.skype;
            altForPhoto = `photo of ${element.name}`;
        }
        addElement(
            'img', 
            user, 
            null, 
            null, 
            null, 
            ['src', `img/startPage/${photoFileName}.jpg`], 
            ['alt', altForPhoto]
        );
    });
}

function addInputFieldWithDescription (form, title, labelId, inputId, inputType, smallId, smallText) {
    const formGroup = addElement('div', form, 'form-group');
    addElement('label', formGroup, null, labelId, title, ['for', inputId]);
    addElement('input', formGroup, 'form-control', inputId, null, ['type', inputType]);
    if (smallId) addElement('small', formGroup, 'form-text text-muted', smallId, smallText);
}

function renderSignUp() {
    const modalFade = addElement('div', body, 'modal fade', 'signup', null, ['role', 'dialog']);
    const modalDialog = addElement('div', modalFade, 'modal-dialog');
    const modalContent = addElement('div', modalDialog, 'modal-content');
    const modalHeader = addElement('div', modalContent, 'modal-header');
    addElement('h5', modalHeader, 'modal-title', 'ModalLabel', 'Sign Up');
    const closeButton = addElement(
        'button', 
        modalHeader, 
        'close', 
        null, 
        null, 
        ['data-dismiss', 'modal'], 
        ['aria-label', 'Close']
    );
    addElement('span', closeButton, null, null, '&times;', ['aria-hidden', 'true']);

    const modalBody = addElement('div', modalContent, 'modal-body');
    const form = addElement('form', modalBody);
    
    addInputFieldWithDescription(
        form, 
        'Email', 
        'signUpEmailLabel', 
        'signUpEmailInput', 
        'email', 
        'signUpEmailSmall', 
        'We\'ll never share your email with anyone else.'
        );
    addInputFieldWithDescription(
        form, 
        'Password', 
        'signUpPasswordLabel', 
        'signUpPasswordInput', 
        'password', 
        'signUpPasswordSmall', 
        'Password must contain at least 8 characters, at least one uppercase letter, one uppercase letter, one number and one special character.'
        );
    addInputFieldWithDescription(
        form, 
        'Confirm password', 
        'signUpConfirmPasswordLabel', 
        'signUpConfirmPasswordInput', 
        'password',
        'signUpConfirmPasswordSmall'
        );
    
    const modalFooter = addElement('div', modalContent, 'modal-footer');
    const registerButton = addElement('button', modalFooter, 'btn btn-success register', 'register', 'Register', ['type', 'button']);
    addElement(
        'button', 
        modalFooter, 
        'btn btn-danger', 
        'closeSignUp', 
        'Close', 
        ['type', 'button'], 
        ['data-dismiss', 'modal']
    );

    registerButton.addEventListener('click', registration);
}

function renderSignIn() {
    const modalFade = addElement('div', body, 'modal fade', 'signin', null, ['role', 'dialog']);
    const modalDialog = addElement('div', modalFade, 'modal-dialog');
    const modalContent = addElement('div', modalDialog, 'modal-content');
    const modalHeader = addElement('div', modalContent, 'modal-header');
    addElement('h5', modalHeader, 'modal-title', 'ModalLabel', 'Sign In');
    const closeButton = addElement(
        'button', 
        modalHeader, 
        'close', 
        null, 
        null, 
        ['data-dismiss', 'modal'], 
        ['aria-label', 'Close']
    );
    addElement('span', closeButton, null, null, '&times;', ['aria-hidden', 'true']);

    const modalBody = addElement('div', modalContent, 'modal-body');
    const form = addElement('form', modalBody);
    
    addInputFieldWithDescription(
        form, 
        'E-mail', 
        'signInEmailLabel', 
        'signInEmailInput', 
        'email',
        'signInEmailSmall'
        );
    addInputFieldWithDescription(form, 
        'Confirm password', 
        'signInPasswordLabel', 
        'signInPasswordInput', 
        'password',
        'signInPasswordSmall'
        );
    
    const modalFooter = addElement('div', modalContent, 'modal-footer');
    const signInButton = addElement(
        'button', 
        modalFooter, 
        'btn btn-success', 
        'signin', 
        'Sign in', 
        ['type', 'button']
    );
    addElement(
        'button', 
        modalFooter, 
        'btn btn-danger', 
        'closeSignIn', 
        'Close', 
        ['type', 'button'], 
        ['data-dismiss', 'modal']
    );

    signInButton.addEventListener('click', signIn);
}

export default function renderStartPage () {
    clearMarkup();
    renderHeader();
    renderHero();
    renderProgressive();
    renderAbout();
    renderFooter();
    renderSignUp();
    renderSignIn();
}