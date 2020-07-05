import renderMiniGames from '../main page/miniGames';
import { showErrorMessage, showSuccessMessage } from '../utils/message';

const menu = [
    {
        'name': 'Main game',
        'callback': () => {
            showErrorMessage('To show \'Main game\' add callback in file \'data/menu.js\'');
        }
    },
    {
        'name': 'Mini games',
        'callback': () => {
            renderMiniGames();
            showSuccessMessage('Block \'Mini games\' is loaded');
        },
    },
    {
        'name': 'Statistics',
        'callback': () => {
            showErrorMessage('To show \'Statistics\' add callback in file \'data/menu.js\'');
        }
    },
    {
        'name': 'Dictionary',
        'callback': () => {
            showErrorMessage('To show \'Dictionary\' add callback in file \'data/menu.js\'');
        }
    },
    {
        'name': 'Promo',
        'callback': () => {
            showErrorMessage('To show \'Promo\' add callback in file \'data/menu.js\'');
        }
    },
    {
        'name': 'About us',
        'callback': () => {
            showErrorMessage('To show \'About us\' add callback in file \'data/menu.js\'');   
        }
    },
];

export default menu;