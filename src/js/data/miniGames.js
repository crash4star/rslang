import { showErrorMessage } from '../utils/message';
import Api from '../models/Api';
import Words from '../models/Words';
import AuthRequest from '../models/AuthRequest'
import ControllerApp from '../savannah/ControllerApp';
import ViewSavannah from '../savannah/ViewSavannah';
import AudioCallControllerApp from '../audio-call/audio-call.ControllerApp'
import AudioCallView from '../audio-call/audio-call.View'
import ViewMethods from '../utils/view-methods'
import SpeakitController from '../speakit/SpeakitController';

const BASE_HEROKU = 'https://afternoon-falls-25894.herokuapp.com';

const getMiniGamesTemplate = (title, description, img, callback) => { // callback must run game
    return {
        title: `${title}`,
        description: `${description}`,
        img: `${img}`,
        callback
    }
}

const getErrorMessageTemplate = (gameName) => {
    showErrorMessage(`To start game ${gameName} change call of 'getErrorMessageTemplate' on your function '/data/minigames.js'`);
}

const miniGames = [
    getMiniGamesTemplate('Speak It', 'Train your speach', 'speakit.jpg', () => new SpeakitController(BASE_HEROKU, true)),
    getMiniGamesTemplate('English Puzzle', 'Description', 'minigame.png', () => getErrorMessageTemplate('English Puzzle')),
    getMiniGamesTemplate('Savannah', 'Description', 'minigame.png', () => {
        const rootBlock = document.querySelector('.root');
        rootBlock.classList.add('root-active');
        const app = new ControllerApp(new Words(new Api(BASE_HEROKU)), new ViewSavannah());
        app.start();
    }),
    getMiniGamesTemplate('Audio Call', 'Description', 'minigame.png', () => {
        const rootBlock = document.querySelector('.root');
        rootBlock.classList.add('root-active');
        const app = new AudioCallControllerApp(new Words(new Api(BASE_HEROKU), new AuthRequest(new Api(BASE_HEROKU))), new AudioCallView(new ViewMethods()), new ViewMethods())
        new AudioCallView(new ViewMethods()).createStartPage()
        const startBtn = document.querySelector('.startBtn')
        const startBtnLearnedWordsMode = document.querySelector('.startBtnlearnedWords')
        
        startBtn.onclick = () => {
            document.querySelector('.wrapperForStartPage').remove()
            app.start();
        }
        startBtnLearnedWordsMode.onclick = () => {
            document.querySelector('.wrapperForStartPage').remove()
            app.startLearnedWordsMode();
        }
    }),

    getMiniGamesTemplate('Sprint', 'Description', 'minigame.png', () => getErrorMessageTemplate('Sprint')),
    getMiniGamesTemplate('Own Game', 'Description', 'minigame.png', () => getErrorMessageTemplate('Own Game'))
];

export default miniGames;
export { getErrorMessageTemplate,  BASE_HEROKU  };