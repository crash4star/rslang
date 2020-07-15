import renderMiniGames from '../main page/miniGames';
import { showErrorMessage, showSuccessMessage } from '../utils/message';
import Statistic from '../main page/statistic';

const getMenuTemplate = (name, callback) => {
    return {
        name: `${name}`,
        callback: callback,
    }
}

const getErrorMessageTemplate = (section) => {
    showErrorMessage(`To show ${section} add callback in '/data/menu.js'`);
}

const getSuccessMessageTemplate = (section) => {
    showSuccessMessage(`Section ${section} is loaded`);
}

const menu = [
    getMenuTemplate ('Main game', () => getErrorMessageTemplate('Main game')),
    getMenuTemplate('Mini games', () => {
        renderMiniGames();
    }),
    getMenuTemplate ('Statistic', () => {new Statistic()}),
    getMenuTemplate ('Dictionary', () => getErrorMessageTemplate('Dictionary')),
    getMenuTemplate ('Promo', () => getErrorMessageTemplate('Promo')),
    getMenuTemplate ('About us', () => getErrorMessageTemplate('About us')),
]


export default menu;