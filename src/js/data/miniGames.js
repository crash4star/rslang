import { showErrorMessage } from '../utils/message';
import Words from '../models/Words';
import Api from '../models/Api'
import View from '../audio-call/view';
import Statistic from '../audio-call/components/createStatistic'

const getMiniGamesTemplate = (title, description, img, callback) => { //callback must run game
    return {
        title: `${title}`,
        description: `${description}`,
        img: `${img}`,
        callback: callback,
    }
}
const rightAnswers = ['fsf', 'fsf','fsf','fsf','fsf','fsf',]
const wrongAnswers = ['wadas', 'wadas','wadas','wadas',]
// const stat = new Statistic(new View()).renderStat(rightAnswers, wrongAnswers)
const getErrorMessageTemplate = (gameName) => {
    showErrorMessage(`To start game ${gameName} change call of 'getErrorMessageTemplate' on your function '/data/minigames.js'`);
}

const miniGames = [
    getMiniGamesTemplate('Speak It', 'Train your speach', 'speakit.jpg', () => getErrorMessageTemplate('SpeakIt')),
    getMiniGamesTemplate('English Puzzle', 'Description', 'minigame.png', () => getErrorMessageTemplate('English Puzzle')),
    getMiniGamesTemplate('Savannah', 'Description', 'minigame.png', () => getErrorMessageTemplate('Savannah')),
    getMiniGamesTemplate('Audio Call', 'Description', 'minigame.png', () => new Statistic(new View()).renderStat(rightAnswers, wrongAnswers)),
    getMiniGamesTemplate('Sprint', 'Description', 'minigame.png', () => getErrorMessageTemplate('Sprint')),
    getMiniGamesTemplate('Own Game', 'Description', 'minigame.png', () => getErrorMessageTemplate('Own Game'))
];
// getErrorMessageTemplate('Audio Call'))
export default miniGames;
export { getErrorMessageTemplate }