import '../../css/menu.scss';
import addElement from '../utils/utils';
import { menu } from '../data/menu';
import { removeContent } from '../main page/mainPage';

let ul;

function setActiveMenuElement(event) {
    const menu = document.getElementsByClassName('nav-item');
    const clickedElement = event.target.closest('.nav-item');
    menu.forEach(element => {
        element.classList.remove('active');
        if (element === clickedElement) {
            element.classList.add('active');
        }
    });
}

function loadContent (event, callback) {
    setActiveMenuElement(event);
    removeContent();
    callback();
}

function addMenuElement (text, callback, isNotActive = true) {
    const className = isNotActive ? 'nav-item' : 'nav-item active';
    const element = addElement('li', ul, className);
    addElement('a', element, 'nav-link', null, text, ['href', '#']);
    element.addEventListener ('click', (event) => {
        loadContent(event, callback);
    });
}
  
export default function renderMenu () {
    const body = document.querySelector('body');
    const nav = addElement('nav', body, 'navbar navbar-expand-lg navbar-light');
    const containter = addElement('div', nav, 'container');
    const button = addElement('button', containter, 'navbar-toggler', null, null, ['type', 'button'], ['data-toggle', 'collapse'], ['data-target', '#navbarNav'], ['aria-controls', 'navbarNav'], ['aria-expanded', 'false'], ['aria-label', 'Toggle navigation']);
    addElement('span', button, 'navbar-toggler-icon');

    const div = addElement('div', containter, 'collapse navbar-collapse', 'navbarNav');
    ul = addElement('ul', div, 'navbar-nav');
    menu.map((el, index) => {
        addMenuElement(el.name, el.callback, index);
    });
}