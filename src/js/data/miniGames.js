import { showErrorMessage } from '../utils/message';
import Speakit from '../speakit/speakit';

const getMiniGamesTemplate = (title, description, img, callback) => { //callback must run game
    return {
        title: `${title}`,
        description: `${description}`,
        img: `${img}`,
        callback: callback,
    }
}

const getErrorMessageTemplate = (gameName) => {
    showErrorMessage(`To start game ${gameName} change call of 'getErrorMessageTemplate' on your function '/data/minigames.js'`);
}

const miniGames = [
    getMiniGamesTemplate('Speak It', 'Train your speach', 'speakit.jpg', () => new Speakit()),
    getMiniGamesTemplate('English Puzzle', 'Description', 'minigame.png', () => getErrorMessageTemplate('English Puzzle')),
    getMiniGamesTemplate('Savannah', 'Description', 'minigame.png', () => getErrorMessageTemplate('Savannah')),
    getMiniGamesTemplate('Audio Call', 'Description', 'minigame.png', () => getErrorMessageTemplate('Audio Call')),
    getMiniGamesTemplate('Sprint', 'Description', 'minigame.png', () => getErrorMessageTemplate('Sprint')),
    getMiniGamesTemplate('Own Game', 'Description', 'minigame.png', () => getErrorMessageTemplate('Own Game'))
];

export default miniGames;
export { getErrorMessageTemplate }