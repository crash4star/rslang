import '../../css/mini_games.scss';
import miniGames from '../data/miniGames';
import addElement from '../utils/utils';

export default function renderMiniGames() {
    const main = document.querySelector('.main');
    const container = main.querySelector('.container');
    
    const row = addElement('div', container, 'row minigame');

    miniGames.forEach(element => {
        const col = addElement('div', row, 'col-xl-4 col-md-6 col-12');
        const item = addElement('div', col, 'minigame-item');
        const imgClass = (element.img === 'minigame.png') ? null : 'gameImage';
        addElement(
            'img', 
            item, 
            imgClass, 
            null, 
            null, 
            ['src', `img/mainPage/${element.img}`], 
            ['alt', `minigame ${element.title}`]
        );
        addElement('h2', item, null, null, element.title);
        addElement('p', item, null, null, element.description);
        const button = addElement('button', item, 'btn btn-primary', null, 'Start');
        button.addEventListener('click', element.callback);
    });
}