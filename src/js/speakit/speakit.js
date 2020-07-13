import "@babel/polyfill";
import '../../css/speakit/speakit.scss';
import View from './tools/View';

export default class SpeakIt {
    constructor () {
        this.init();
    }

    init () {
        this.view = new View();
        this.gameButton = document.querySelector('.speak');
        this.addListeners();
    }
    
    addListeners () {
        const gameButton = this.gameButton;
        
        // document.getElementById('results').addEventListener('click', () => {
        //     this.resultClickEmulation();
        // });

        // document.getElementById('return').addEventListener('click', () => {
        //     this.emulateReturnButton();
        // });
        
        // document.getElementById('newGame').addEventListener('click', () => {
        //     this.newGame();
        //     this.emulateReturnButton();
        // });
    }
    
    // resultClickEmulation() {
    //     this.stopGame();
    //     this.cardsPage.showStatistic();
    //     this.gamePage.classList.add('hidden');
    //     this.statPage.classList.remove('hidden');
    // }
    
    emulateReturnButton() {
        this.gamePage.classList.remove('hidden');
        this.statPage.classList.add('hidden');
    }
}