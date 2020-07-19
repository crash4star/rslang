import { showErrorMessage } from '../utils/message';
import Api from '../models/Api';
import Words from '../models/Words';
import AuthRequest from '../models/AuthRequest'
import ControllerApp from '../savannah/ControllerApp';
import ViewSavannah from '../savannah/ViewSavannah';
import PuzzleGame from '../puzzle/initApp';
import AudioCallControllerApp from '../audio-call/audio-call.ControllerApp'
import AudioCallView from '../audio-call/audio-call.View'
import ViewMethods from '../utils/view-methods'
import SprintControllerApp from '../sprint/sprint.ControllerApp';
import SprintView from '../sprint/sprint.View'
import SpeakitController from '../speakit/SpeakitController';
import OwnGameControllerApp from '../own-game/own-game.ControllerApp'
import OwnGameView from '../own-game/own-game.View'

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
    getMiniGamesTemplate('Speak It', 'Train your speach', 'speak.svg', () => new SpeakitController(BASE_HEROKU, true)),
    getMiniGamesTemplate('English Puzzle', 'Click on words, make phrases, collect the puzzle', 'puzzle-icon.svg', () => PuzzleGame()),
    getMiniGamesTemplate('Savannah', 'Hurry up to guess the word until the crystal disappears', 'crystal.svg', () => {
        const rootBlock = document.querySelector('.root');
        rootBlock.classList.add('root-active');
        const app = new ControllerApp(new Words(new Api(BASE_HEROKU)), new ViewSavannah());
        app.start();
    }),
    getMiniGamesTemplate('Audio Call', 'Train your speech recognition', 'audio.svg', () => {
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


    getMiniGamesTemplate('Own Game', 'Trains you to choose the right words in a sentence', 'crown.svg', () => {
        const rootBlock = document.querySelector('.root');
        rootBlock.classList.add('root-active');
        const app = new OwnGameControllerApp(new Words(new Api(BASE_HEROKU), new AuthRequest(new Api(BASE_HEROKU))), new OwnGameView(new ViewMethods()), new ViewMethods())
        app.renderStartPage()
        const startBtn = document.querySelector('.ownGame-startBtn')
        startBtn.onclick = () => {
            document.querySelector('.ownGame-startPage-container').remove()
            app.start();
        }
    }),

    getMiniGamesTemplate('Sprint', 'train your speed of translation of the words', 'sprint.svg', () => {
        const rootBlock = document.querySelector('.root');
        rootBlock.classList.add('root-active');
        const app = new SprintControllerApp(new Words(new Api(BASE_HEROKU), new AuthRequest(new Api(BASE_HEROKU))), new SprintView(new ViewMethods()), new ViewMethods())
        app.start()
        const startBtn = document.querySelector('.sprint-startBtn')
        const startBtnForLearnedWords = document.querySelector('.sprint-startBtnlearnedWords')
        startBtn.onclick = () => {
            document.querySelector('.sprint-container').remove()
            app.play();
        }
        startBtnForLearnedWords.onclick = () => {
            document.querySelector('.sprint-container').remove()
            app.playLearnedWords()
        }
    }),

];

export default miniGames;
export { getErrorMessageTemplate,  BASE_HEROKU  };
