import renderHeader from '../components/header';
import renderFooter from '../components/footer';
import { refreshToken, signOut } from '../utils/authorization';
import renderMenu from './menu';
import renderSettings from './settings';
import addElement from '../utils/utils';
import '../../css/main_page.scss';
import '../../css/menu.scss';

function renderMainPart () {
    const body = document.querySelector('body');
    addElement('div', body, 'main'); // Section description block
    addElement('div', body, 'root'); // Mini-game block
    addElement('div', body, 'message'); // Notification block
}

function removeContent() {
    document.querySelector('.main').innerHTML = '';
    document.querySelector('.root').innerHTML = '';
}

export default function renderMainPage() {
    if (refreshToken()) {
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