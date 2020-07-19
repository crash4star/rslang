import renderMiniGames from '../main page/miniGames';
import { showErrorMessage, showSuccessMessage } from '../utils/message';
import DictionaryView from '../main page/Dictionary/dictionaryView';
import DictionaryController from '../main page/Dictionary/dictionaryController';
import Words from '../models/Words';
import AuthRequest from '../models/AuthRequest';
import Api from '../models/Api';
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
    getMenuTemplate('Main game', () => mainGame()),
    getMenuTemplate('Mini games', () => {
        renderMiniGames();
    }),

    getMenuTemplate('Statistic', () => {
        const statistic = new GlobalStatistic();
        statistic.init();
    }),
    getMenuTemplate('Dictionary', () => {
        const BASE_HEROKU = 'https://afternoon-falls-25894.herokuapp.com';
        const dictionary = new DictionaryController(new Words(new Api(BASE_HEROKU), new AuthRequest(new Api(BASE_HEROKU))), new DictionaryView());
    }),
    // getMenuTemplate ('Promo', () => getErrorMessageTemplate('Promo')),
    // getMenuTemplate ('About us', () => getErrorMessageTemplate('About us')),
];


export default menu;