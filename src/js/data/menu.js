import renderMiniGames from '../main page/miniGames';
import { showErrorMessage, showSuccessMessage } from '../utils/message';
import DictionaryView from '../main page/Dictionary/dictionaryView';
import DictionaryController from '../main page/Dictionary/dictionaryController';
import Words from '../models/Words';
import AuthRequest from '../models/AuthRequest';
import Api from '../models/Api';

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
    getMenuTemplate ('Dictionary', () => {
        const BASE_HEROKU = 'https://afternoon-falls-25894.herokuapp.com';
        const dictionary = new DictionaryController(new Words(new Api(BASE_HEROKU), new AuthRequest(new Api(BASE_HEROKU))), new DictionaryView());
    }),
    // getMenuTemplate ('Promo', () => getErrorMessageTemplate('Promo')),
    // getMenuTemplate ('About us', () => getErrorMessageTemplate('About us')),
];


export default menu;