import { wordsUrl, gitUrl, translateUrl } from './../data/data';
import Card from './Card';
import addElement from '../../utils/utils';
import Statistic from '../../utils/createStatistic';
import ViewMethods from '../../utils/view-methods';
import { BASE_HEROKU } from '../../data/miniGames';
import SpeakitController from '../SpeakitController';
import shuffleArr from '../../utils/shuffleArr';

const countWordsToStudy = 10;

export default class CardsPage {
    constructor(parent, caller) {
        this.caller = caller;
        this.parent = parent;
        this.image = document.querySelector('#speakit-image');
        this.translation = document.getElementById('translate');
        this.chapter = 0;
        this.activeCard = null;
        this.audio = new Audio();
        this.data = [];
        this.rightAnswerCounter = 0;
        this.isTrainStudyingWords = false;
        this.gameIsStarted = false;
        this.render();
        this.init();
    }

    setActiveCard(e) {
        if (e.target.closest('.cards-card')) {
            const cardNumber = parseInt(e.target.closest('.cards-card').id, 10);
            this.removeActiveCards();
            this.activateCard (cardNumber);
            this.updatePicture();
            this.updateTranslation();
            this.playSound();
        }
    }

    stopGame () {
        this.gameIsStarted = false;
        this.gameButton.innerHTML = 'Press to start';
        this.cards.addEventListener('click', (e) => this.setActiveCard(e));
        this.gameButton.addEventListener('click', this.startGame);
    }

    render () {
        this.cards = addElement('div', this.parent, 'row cards', 'speakit-cards');
        const buttons = addElement('div', this.parent, 'buttons');
        this.restartButton = addElement('div', buttons, 'button restart', 'restart', 'Restart');
        this.gameButton = addElement('div', buttons, 'button speak', 'speak', 'Press to start');
        this.resultButton = addElement('div', buttons, 'button results', 'results', 'Results');

        this.cards.addEventListener('click', (e) => {
            debugger;
            this.setActiveCard(e);
        });

        this.restartButton.addEventListener('click', () => {
            this.stopGame();
            this.restart();
        });

        this.gameButton.addEventListener('click', () => this.startGame());
        this.resultButton.addEventListener('click', () => 
        {
            this.caller.showMainWindow();
            this.showStatistic();
        });
    }

    init() {
        this.getCards();
        this.cards.innerHTML = '';
        this.renderCards();
    }

    refresh (chapter) {
        if (chapter === undefined) chapter = this.chapter;
        this.chapter = chapter;
        this.data = [];
        this.init();
    }

    getCardsToStudy(cards) {
        const arrayToStudy = [];
        cards.forEach(el => {
            let card = {};
            let {word, transcription, audio, image} = el.optional;
            card = {word, transcription, audio, image};
            card.id = el.id;
            arrayToStudy.push(card);
        });
        return arrayToStudy;
    }

    getCards() {
        if (this.caller.isLoadStudiedWords) {
            this.data = shuffleArr(this.getCardsToStudy(this.caller.model.words.wordsToStudy));
        } else {
            this.data = shuffleArr(this.caller.model.words.wordsByLevel);
        }
    }

    renderCards() {
        for (let i = 0; i < 10; i += 1) {
            new Card(this.data[i], i);
        }
        this.cardNodes = document.querySelectorAll('.cards-card');
        
    }

    removeActiveCards() {
        for (let i = 0; i < this.cardNodes.length; i += 1) {
            this.cardNodes[i].classList.remove('active');
        }
    }

    activateCard(cardNumber) {
        this.activeCard = cardNumber;
        this.cardNodes[cardNumber].classList.add('active');
    }

    updatePicture() {
        const src = this.data[this.activeCard].image.substr(6);
        const url = `${gitUrl}${src}`;
        this.image.src = url;
    }

    async getTranslation(word) {
        const url = `${translateUrl}&text=${this.data[this.activeCard].word}&lang=en-ru`;
        const res = await fetch(url);
        const data = await res.json();
        return data.text.join('');
    }

    async updateTranslation(word) {
        if (!word) {
            word = await this.getTranslation(word);
        }
        this.translation.innerHTML = word;
    }

    playSound(id) {
        if (id === undefined) id = this.activeCard;
        const src = this.data[id].audio.substr(6);
        this.audio.src = `${gitUrl}${src}`;
        this.audio.play();
    }

    startGame() {
        this.gameIsStarted = true;
        debugger;
        this.gameButton.removeEventListener('click', this.startGame);
        this.cards.removeEventListener('click', (e) => this.setActiveCard(e));
        this.gameButton.innerHTML = 'Speak please';
        this.removeActiveCards();
        this.translation.innerHTML = '';
        console.log ('start game');
        let recognition;
        if (window.SpeechRecognition) {
            recognition = new SpeechRecognition();
        } else {
            recognition = new webkitSpeechRecognition();
        }
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        recognition.maxAlternatives = 5;
        recognition.onend = () => {
            recognition.start();
        }

        const data = this.data;
        recognition.addEventListener('result', (e) => {
            const transcript = Array.from(e.results)
                .map(result => {
                    const recognitionWords = [];
                    for (let i = 0; i < result.length; i += 1) {
                        recognitionWords.push(result[i].transcript);
                    }
                    return recognitionWords;
                });
                console.log (transcript[0], data);
                this.checkAnswer(transcript[0], data);
                if (document.getElementsByClassName('cards-card active').length === 10) {
                    console.log('stop');
                    recognition.onend = null;
                    recognition.stop();
                    this.showStatistic();
                };
        });
        recognition.start();
    }

    checkAnswer(result, data) {
        result.forEach(word => {
            for (let i = 0; i < data.length; i +=1 ) {
                if (data[i].word.toLocaleLowerCase() === word.toLocaleLowerCase()) {
                    this.updateTranslation(word);
                    this.rightAnswerCounter += 1;
                    this.activeCard = i;
                    this.cardNodes[i].classList.add('active');
                    this.updatePicture();
                }
            }
        });
    }

    restart() {
        this.removeActiveCards();
    }
    
    showStatistic() {
        if (!this.gameIsStarted) {
            this.removeActiveCards();
        }
        this.stopGame();
        const rightAnswer = [];
        const wrongAnswer = [];
        this.data.forEach ((element, index) => {
            const el = {};
            el.word = element.word;
            el.audio = element.audio.substr(6);
            el.transcription = element.transcription;
            el.isAnswered = this.cardNodes[index].classList.contains('active') ? true : false;
            el.isAnswered ? rightAnswer.push(el) : wrongAnswer.push(el);
            el.id = index;
        });
        this.caller.root.innerHTML = '';
        new Statistic(new ViewMethods(), () => new SpeakitController(BASE_HEROKU, false)).renderStat(rightAnswer, wrongAnswer);

        this.caller.gamePage.classList.add('hidden');
    }
}