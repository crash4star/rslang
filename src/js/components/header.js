import { addElement } from '../utils/utils';

const body = document.querySelector('body');

export default function renderHeader () {
    const header = addElement('header', body, 'navbar navbar-light bg-light');
    const container = addElement('div', header, 'container');
    addElement('img', container, null, null, null, ['src', './img/startPage/icon-english.png'], ['alt', 'icon']);
    const div = addElement('div', container);
    addElement('button', div, 'btn btn-red', null, 'Sign up', ['data-toggle', 'modal'], ['data-target', '#signup']);
    addElement('button', div, 'btn btn-gray', null, 'Sign in', ['data-toggle', 'modal'], ['data-target', '#signin']);
}