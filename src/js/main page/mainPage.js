import renderHeader from '../components/header';
import renderFooter from '../components/footer';
import renderMenu from './menu';
import GlobalSettings from './GlobalSettings';
import addElement from '../utils/utils';
import { clearMarkup } from '../utils/utils';
import '../../css/main_page.scss';
import '../../css/menu.scss';

const body = document.querySelector('body');

function renderNotificationBlock() {
    const alert = addElement('div', body, 'alert hidden');
    addElement('div', alert, 'container', 'message');
}

function renderMainPart () {
    const main = addElement('div', body, 'main'); // Section description block
    addElement('div', main, 'container');
    addElement('div', body, 'root', 'root'); // Mini-game block
}

function removeContent() {
    const main = document.querySelector('.main');
    main.querySelector('.container').innerHTML = '';
    document.querySelector('.root').innerHTML = '';
}

function renderSettings() {
    return new GlobalSettings();
}

export default function renderMainPage() {
    clearMarkup();
    renderNotificationBlock();
    renderHeader();
    renderMenu();
    renderMainPart();
    renderFooter();
    renderSettings();
}

export { removeContent }