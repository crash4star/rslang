import addElement from '../utils/utils';

const body = document.querySelector('body');

export default function renderfooter () {
    const footer = addElement('footer', body, 'navbar navbar-light bg-light');
    const container = addElement('div', footer, 'container');
    addElement(
        'img', 
        container, 
        null, 
        null, 
        null, 
        ['src', 'img/startPage/icon-english.png'], 
        ['alt', 'icon']);
    addElement(
        'div', 
        container, 
        'rsschool', 
        null, 
        'rsschool'
    );
}