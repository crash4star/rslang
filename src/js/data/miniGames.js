import { showErrorMessage } from '../utils/message';
import Api from '../models/Api';
import Words from '../models/Words';
import ControllerApp from '../savannah/ControllerApp';
import ViewSavannah from '../savannah/ViewSavannah';
import ViewMethods from '../utils/view-methods'
import SprintControllerApp from '../sprint/sprint.ControllerApp';
import SprintView from '../sprint/sprint.View'

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
    getMiniGamesTemplate('English Puzzle', 'Description', 'minigame.png', () => getErrorMessageTemplate('English Puzzle')),
    getMiniGamesTemplate('Savannah', 'Description', 'minigame.png', () => {
        const rootBlock = document.querySelector('.root');
        rootBlock.classList.add('root-active');
        const app = new ControllerApp(new Words(new Api(BASE_HEROKU)), new ViewSavannah());
        app.start();
    }),
    getMiniGamesTemplate('Audio Call', 'Description', 'minigame.png', () => getErrorMessageTemplate('Audio Call')),

    getMiniGamesTemplate('Sprint', 'Description', 'minigame.png', () => {
        const rootBlock = document.querySelector('.root');
        rootBlock.classList.add('root-active');
        const app = new SprintControllerApp(new Words(new Api(BASE_HEROKU)), new SprintView(new ViewMethods()), new ViewMethods())
        app.start()
        const startBtn = document.querySelector('.sprint-startBtn')
        startBtn.onclick = () => {
            document.querySelector('.sprint-container').remove()
            app.play();
        }
    }),
    getMiniGamesTemplate('Own Game', 'Description', 'minigame.png', () => getErrorMessageTemplate('Own Game'))
];
// getErrorMessageTemplate('Sprint')
export default miniGames;
export { getErrorMessageTemplate, BASE_HEROKU };