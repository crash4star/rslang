import renderHeader from '../components/header';
import renderFooter from '../components/footer';
import renderMenu from './menu';

import switchThemeMode from './switchTheme';
import setDifficult from './setDiffcult';
import addElement from '../utils/utils';
import { clearMarkup } from '../utils/utils';

import GlobalSettings from './GlobalSettings';
import Api from '../models/Api';
import AuthRequest from '../models/AuthRequest';
import Settings from '../models/Settings';
import { BASE_HEROKU } from '../data/miniGames';

import '../../css/main_page.scss';
import '../../css/menu.scss';
import mainGame from '../main-game/startLinguist';

const body = document.querySelector('body');

function renderNotificationBlock() {
    const alert = addElement('div', body, 'alert hidden');
    addElement('div', alert, 'container', 'message');
}
function renderSpinner() { 
    addElement('div', body, 'spinner');
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
    const api = new Api(BASE_HEROKU);
    const authRequest = new AuthRequest(api);
    const settings = new Settings(api, authRequest);
    return new GlobalSettings(settings);
}

function renderMainGame() {
    mainGame();
}

export default function renderMainPage() {
    clearMarkup();
    renderNotificationBlock();
    renderSpinner();
    renderHeader();
    renderMenu();
    renderMainPart();
    renderFooter();
    renderSettings();
    switchThemeMode();
    setDifficult();
    renderMainGame();
}

export { removeContent };