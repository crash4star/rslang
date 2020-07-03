import addElement from '../utils/utils';
import '../../css/menu.scss';
import { menu } from '../data/menu';

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

function clearPage() {
    if (document.querySelector('main')) document.querySelector('main').remove;
    if (document.querySelector('.root')) document.querySelector('.root').innerHTML = '';
}

function loadContent (event, callback) {
    setActiveMenuElement(event);
    clearPage();
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
    const nav = addElement('nav', body, 'navbar navbar-expand-lg navbar-light bg-light');
    const button = addElement('button', nav, 'navbar-toggler', null, null, ['type', 'button'], ['data-toggle', 'collapse'], ['data-target', '#navbarNav'], ['aria-controls', 'navbarNav'], ['aria-expanded', 'false'], ['aria-label', 'Toggle navigation']);
    addElement('span', button, 'navbar-toggler-icon');

    const div = addElement('div', nav, 'collapse navbar-collapse', 'navbarNav');
    ul = addElement('ul', div, 'navbar-nav');
    menu.map((el, index) => {
        addMenuElement(el.name, el.callback, index);
    });
}