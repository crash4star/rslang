import addElement from '../utils/addElement';

const body = document.querySelector('body');

export default function renderfooter () {
    const footer = addElement('header', body, 'navbar navbar-light bg-light');
    const container = addElement('div', footer, 'container');
    addElement('img', container, null, null, null, ['src', 'img/startPage/icon-english.png'], ['alt', 'icon']);
    addElement('div', container, 'rsschool', null, 'rsschool');
}