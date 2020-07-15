import { showErrorMessage } from '../utils/message';
import Api from '../models/Api';
import Words from '../models/Words';
import ControllerApp from '../savannah/ControllerApp';
import ViewSavannah from '../savannah/ViewSavannah';
import PuzzleGame from '../puzzle/initApp';

const BASE_HEROKU = 'https://afternoon-falls-25894.herokuapp.com';


const getMiniGamesTemplate = (title, description, img, callback) => { //callback must run game
    return {
        title: `${title}`,
        description: `${description}`,
        img: `${img}`,
        callback: callback
    }
}

const getErrorMessageTemplate = (gameName) => {
    showErrorMessage(`To start game ${gameName} change call of 'getErrorMessageTemplate' on your function '/data/minigames.js'`);
}

const miniGames = [
    getMiniGamesTemplate('Speak It', 'Train your speach', 'speakit.jpg', () => getErrorMessageTemplate('SpeakIt')),
    getMiniGamesTemplate('English Puzzle', 'Description', 'minigame.png', () => PuzzleGame()),
    getMiniGamesTemplate('Savannah', 'Description', 'minigame.png', () => {
        const rootBlock = document.querySelector('.root');
        rootBlock.classList.add('root-active');
        const app = new ControllerApp(new Words(new Api(BASE_HEROKU)), new ViewSavannah());
        app.start();
    }),
    getMiniGamesTemplate('Audio Call', 'Description', 'minigame.png', () => getErrorMessageTemplate('Audio Call')),

    getMiniGamesTemplate('Sprint', 'Description', 'minigame.png', () => getErrorMessageTemplate('Sprint')),
    getMiniGamesTemplate('Own Game', 'Description', 'minigame.png', () => getErrorMessageTemplate('Own Game'))
];
//
export default miniGames;
export { getErrorMessageTemplate, BASE_HEROKU };
