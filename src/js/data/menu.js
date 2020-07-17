import renderMiniGames from '../main page/miniGames';
import { showErrorMessage } from '../utils/message';

import mainGame from '../main-game/startLinguist';

import GlobalStatistic from '../main page/GlobalStatistic';

const getMenuTemplate = (name, callback) => {
    return {
        name: `${name}`,
        callback
    }
}

const getErrorMessageTemplate = (section) => {
    showErrorMessage(`To show ${section} add callback in '/data/menu.js'`);
}

const menu = [
    getMenuTemplate ('Main game', () => mainGame()),
    getMenuTemplate('Mini games', () => {
        renderMiniGames();
    }),
    getMenuTemplate ('Statistic', () => {
        const statistic = new GlobalStatistic();
        statistic.init();
    }),
    getMenuTemplate ('Dictionary', () => getErrorMessageTemplate('Dictionary')),
    getMenuTemplate ('Promo', () => getErrorMessageTemplate('Promo')),
    getMenuTemplate ('About us', () => getErrorMessageTemplate('About us')),
]


export default menu;