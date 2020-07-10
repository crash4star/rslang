import renderHeader from '../components/header';
import renderFooter from '../components/footer';
import { refreshToken, signOut } from '../utils/authorization';
import renderMenu from './menu';
import renderSettings from './settings';
import addElement from '../utils/utils';
import '../../css/main_page.scss';
import '../../css/menu.scss';

const body = document.querySelector('body');

function renderNotificationBlock() {
    const alert = addElement('div', body, 'alert');
    const container = addElement('div', alert, 'container', 'message');
    addElement('div', container, 'alert-message'); // Notification block
}

function renderMainPart () {
    const main = addElement('div', body, 'main'); // Section description block
    addElement('div', main, 'container');
    addElement('div', body, 'root'); // Mini-game block
}

function removeContent() {
    const main = document.querySelector('.main');
    main.querySelector('.container').innerHTML = '';
    document.querySelector('.root').innerHTML = '';
}

export default function renderMainPage() {
    if (refreshToken()) {
        renderNotificationBlock();
        renderHeader();
        renderMenu();
        renderMainPart();
        renderFooter();
        renderSettings();
    } else {
        signOut();
    }
}

export { removeContent }