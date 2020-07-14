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
        // const dictionary = new DictionaryController(new Words(new Api(BASE_HEROKU), new ViewDictionary()));
        const dictionary = new DictionaryController(new Words(new Api(BASE_HEROKU), new AuthRequest(new Api(BASE_HEROKU))), new DictionaryView());
        // dictionary.render({word: 'Test', wordId: 'test-12312312313', wordTranslate: 'Тэст', transcription: '[ wɜːd ]', textExample: 'Test is another way', textMeaning: 'Test mean test something', total: 132, date: '22.06.2020', dateInterval: '22.07.2020'});
        // dictionary.render({word: 'Test', wordId: 'test-12312312313', wordTranslate: 'Тэст', transcription: '[ wɜːd ]', textExample: 'Test is another way', textMeaning: 'Test mean test something', total: 132, date: '22.06.2020', dateInterval: '22.07.2020'});
        // dictionary.render({word: 'Test', wordId: 'test-12312312313', wordTranslate: 'Тэст', transcription: '[ wɜːd ]', textExample: 'Test is another way', textMeaning: 'Test mean test something', total: 132, date: '22.06.2020', dateInterval: '22.07.2020'});

    }),
    getMenuTemplate ('Promo', () => getErrorMessageTemplate('Promo')),
    getMenuTemplate ('About us', () => getErrorMessageTemplate('About us')),
];


export default menu;