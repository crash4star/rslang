const chaptersNumber = 6;
const wordsUrl = 'https://afternoon-falls-25894.herokuapp.com/words';
const soundImageUrl = './img/speakit/sound.png';
const defaultCardImage = './img/speakit/blank.jpg';
const gitUrl = 'https://raw.githubusercontent.com/Jimmba/rslang-data/master/data/';
const translateKey = 'trnsl.1.1.20200424T185832Z.d9139d176f575004.56a1ccffd47b50fb84f642be98d63c2a5c8b8eb1';
const translateAPI = 'https://translate.yandex.net/api/v1.5/tr.json/translate?';
const translateUrl = `${translateAPI}key=${translateKey}`;
const descriptions = [
    'Click on the words to hear them sound.',
    'Click on the button and speak the words into the microphone.',
    'If there are enough words to study you will have a choice between games modes (train studied or random words)',
    'You can change difficulty level of random words studying game at the top of the page. Be careful - it overwrites you progress in minigame!',
    'Level will up if you say all words correctly only.',
    'Game will start from the beginning (the first difficulty level) if you study all words in training random words.',
    'If you stop game, you will redirected to the statistic page.'
]

export default chaptersNumber;
export {wordsUrl, soundImageUrl, defaultCardImage, gitUrl, translateUrl, descriptions} ;