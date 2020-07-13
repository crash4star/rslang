import addElement from '../utils/utils';
import { defaultCardImage } from './data/data';
import Chapters from './elements/Chapters';
import CardsPage from './elements/CardsPage';

export default class View {
  constructor(model) {
    debugger;
    this.model = model;
    this.init();
  }

  addStartPageDescription(text){
    addElement('p', this.startPage, 'speakit-startPage--text', this.startPage, text);
  }

  renderStartPage() {
    this.startPage = addElement('div', speakit, 'speakit-startPage', 'speakit-startPage');
    addElement('h1', this.startPage, 'speakit-startPage--title', 'Speakit');
    this.addStartPageDescription('Click on the words to hear them sound.');
    this.addStartPageDescription('Click on the button and speak the words into the microphone.');
    const startPageButton = addElement('div', this.startPage, 'speakit-startPage--button', 'speakit-startPage--button', 'Start');
    startPageButton.addEventListener('click', () => {
      document.getElementById('speakit-startPage').classList.add('hidden');
    }); 
  }

  newGame(e) {
    let chapter;
    if (e !== undefined) {
        chapter = this.chapters.setActiveElement(e.target);
    }
    this.cardsPage.refresh(chapter);
  }

  renderChapters() {
    const activeChapter = 0; //get from db
    this.chapters = new Chapters(this.gamePage, activeChapter);
    this.chapters.render();

    this.chapters.node.addEventListener('click', (e) => {
      this.newGame(e);
  });
  }

  renderCloseButton() {
    const closeButton = addElement('div', this.gamePage, 'speakit-close');
    closeButton.addEventListener('click', () =>  {
      this.root.innerHTML = '';
    });
  }

  renderTranslation() {
    this.content = addElement('div', this.gamePage, 'speakit-content');
    addElement('img', this.content, 'image', 'speakit-image', null, ['src', defaultCardImage]);
    const action = addElement('div', this.content, 'action');
    addElement('div', action, 'mic hidden');
    addElement('div', action, 'translate', 'translate');
  }

  renderCards() {
    this.cardsPage = new CardsPage(this.content, this);
  }

  renderContent() {
    this.renderTranslation();
    this.renderCards();
  }

  renderGamePage() {
    this.gamePage = addElement('div', this.container, 'speakit-gamePage');
    this.renderChapters();
    this.renderCloseButton();
    this.renderContent();
  }

  returnToGame() {
    this.gamePage.classList.remove('hidden');
    this.statPage.classList.add('hidden');
  }

  renderStatisticPage() {
    this.statPage = addElement('div', this.container, 'speakit-statPage hidden');
    this.statPageContent = addElement('div', this.statPage, 'statPageContent', 'statPage');

    const statButtons = addElement('div', this.statPage, 'buttons');
    const returnButton = addElement('div', statButtons, 'button return', 'return', 'Return');
    const newGameButton = addElement('div', statButtons, 'button newGame', 'newGame', 'New game');
    
    this.statPage.addEventListener('click', (e) => {
      if (e.target.closest('.speakit-statistic')){
        let id = e.target.closest('.speakit-statistic').id;
        id = parseInt(id, 10);
        this.cardsPage.playSound(id);
      }
    });

    returnButton.addEventListener('click', () => {
      this.returnToGame();
    });

    newGameButton.addEventListener('click', () => {
      this.returnToGame()
      this.newGame();
    });
  }

  init() {
    this.root = document.querySelector('.root');
    this.root.classList.add('root-active');
    this.speakit = addElement('div', this.root, 'speakit', 'speakit');
    this.container = addElement('div', this.speakit, 'container');
    this.renderStartPage();
    this.renderGamePage();
    this.renderStatisticPage();
  }
}
