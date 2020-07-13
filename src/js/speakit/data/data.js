const chaptersNumber = 6;
const wordsUrl = 'https://afternoon-falls-25894.herokuapp.com/words';
const soundImageUrl = './img/speakit/sound.jpg';
const defaultCardImage = './img/speakit/blank.jpg';
const gitUrl = 'https://raw.githubusercontent.com/Jimmba/rslang-data/master/data/';
const translateKey = 'trnsl.1.1.20200424T185832Z.d9139d176f575004.56a1ccffd47b50fb84f642be98d63c2a5c8b8eb1';
const translateAPI = 'https://translate.yandex.net/api/v1.5/tr.json/translate?';
const translateUrl = `${translateAPI}key=${translateKey}`;


export default chaptersNumber;
export {wordsUrl, soundImageUrl, defaultCardImage, gitUrl, translateUrl} ;