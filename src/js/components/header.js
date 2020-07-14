import addElement from '../utils/utils';
import { signOut } from '../utils/authorization';
import renderStartPage from '../start page/startPage';

const body = document.querySelector('body');

export default function renderHeader () {
    const isAuthorized = !!localStorage.getItem('userId');
    const header = addElement('header', body, 'navbar navbar-light bg-light');
    const container = addElement('div', header, 'container');
    addElement(
        'img', 
        container, 
        null, 
        null, 
        null, 
        ['src', './img/startPage/icon-english.png'], 
        ['alt', 'icon']
    );
    const div = addElement('div', container, 'wrapper');
    if (!isAuthorized) {
        addElement(
            'button', 
            div, 
            'btn btn-red', 
            null, 
            'Sign up', 
            ['data-toggle', 'modal'], 
            ['data-target', '#signup']
        );
        addElement(
            'button', 
            div, 
            'btn btn-gray', 
            null, 
            'Sign in', 
            ['data-toggle', 'modal'], 
            ['data-target', '#signin']
        );
    } else {
        const login = localStorage.getItem('login');
        const settings = addElement(
            'div', 
            div, 
            'settings header-clickable', 
            null, 
            null, 
            ['data-toggle', 'modal'], 
            ['data-target', '#settings'], 
            ['title', 'Settings']
        );
        addElement('img', 
            settings, 
            null, 
            null, 
            null, 
            ['src', './img/mainPage/settings.png']
        );
        addElement('div', div, 'login', null, login);
        const logOut = addElement('div', div, 'logOut header-clickable');
        addElement(
            'img', 
            logOut, 
            null, 
            null, 
            null, 
            ['src', './img/mainPage/logOut.png'], 
            ['title', 'Log Out']
        );
        logOut.addEventListener('click', () => {
            signOut();
            renderStartPage();
        });
    }
}