import renderMiniGames from '../main page/miniGames';
import { showErrorMessage, showSuccessMessage } from '../utils/message';

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
        getSuccessMessageTemplate('Mini games');
    }),
    getMenuTemplate ('Statistic', () => getErrorMessageTemplate('Statistic')),
    getMenuTemplate ('Dictionary', () => getErrorMessageTemplate('Dictionary')),
    getMenuTemplate ('Promo', () => getErrorMessageTemplate('Promo')),
    getMenuTemplate ('About us', () => getErrorMessageTemplate('About us')),
]


export default menu;