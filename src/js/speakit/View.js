import '../../css/speakit/speakit.scss';
import addElement from '../utils/utils';
import { defaultCardImage, descriptions } from './data/data';
import Chapters from './elements/Chapters';
import CardsPage from './elements/CardsPage';
import { gamesInLevel } from './Model'
import { showErrorMessage, showSuccessMessage } from '../utils/message';
import showSpinner from '../utils/spinner';

const minWordsToStudy = 10;

export default class View {
  constructor(model, controller, isNeedToLoadStartPage, isLoadStudiedWords = false) {
    this.parentController = controller;
    this.model = model;
    this.isNeedToLoadStartPage = isNeedToLoadStartPage;
    this.isLoadStudiedWords = isLoadStudiedWords;  
    this.main = document.querySelector('.main');
    this.init();
  }

  addStartPageDescription(text){
    addElement('p', this.startPage, 'speakit-startPage--text', null, text);
  }

  hideStartPage() {
    document.getElementById('speakit-startPage').classList.add('hidden');
    this.renderGamePage();
  }

  askWhichGamePlay() {
    const root = document.querySelector('.root');
    const modalFade = addElement('div', root, 'modal fade', 'speakit-selectGame', null, ['role', 'dialog']);
    const modalDialog = addElement('div', modalFade, 'modal-dialog');
    const modalContent = addElement('div', modalDialog, 'modal-content');
    const modalHeader = addElement('div', modalContent, 'modal-header');
    addElement('h5', modalHeader, 'modal-title', 'ModalLabel', 'Select game');
    const closeButton = addElement(
        'button', 
        modalHeader, 
        'close', 
        null, 
        null, 
        ['data-dismiss', 'modal'], 
        ['aria-label', 'Close']
    );
    addElement('span', closeButton, null, null, '&times;', ['aria-hidden', 'true']);

    const modalBody = addElement('div', modalContent, 'modal-body');
    const form = addElement('form', modalBody);
    addElement('label', form, null, null, 'Would you want to train studied words of random words?');
    
    const modalFooter = addElement('div', modalContent, 'modal-footer');
    const studiedWords = addElement(
      'button', 
      modalFooter, 
      'btn btn-success', 
      'speakit-train', 
      'Studied words', 
      ['type', 'button'], 
      ['data-dismiss', 'modal']
    );
    const randomWords = addElement(
        'button', 
        modalFooter, 
        'btn btn-success', 
        'speakit-random', 
        'Random words', 
        ['type', 'button'], 
        ['data-dismiss', 'modal']
    );

    studiedWords.addEventListener('click', () => {
      this.isLoadStudiedWords = true;
      this.hideStartPage();
      showSuccessMessage(`Game is loading in traininig mode`);
    });
    randomWords.addEventListener('click', () => {
      this.isLoadStudiedWords = false;
      this.hideStartPage();
      showSuccessMessage(`Game is loading in playing mode`);
    })
  }

  renderStartPage(isNeedToShowModal) {
    if (this.isNeedToLoadStartPage) {
      this.askWhichGamePlay();
      this.startPage = addElement('div', speakit, 'speakit-startPage', 'speakit-startPage');
      addElement('h1', this.startPage, 'speakit-startPage--title', 'Speakit', 'SpeakIt');
      descriptions.forEach(element => {
        this.addStartPageDescription(element);
      })
      const startPageButton = addElement('div', this.startPage, 'speakit-startPage--button', 'speakit-startPage--button', 'Start');
      
      if (isNeedToShowModal) {
        startPageButton.setAttribute('data-toggle', 'modal');
        startPageButton.setAttribute('data-target', '#speakit-selectGame');
      } else {
        startPageButton.addEventListener('click', () => {
          this.hideStartPage();
          showErrorMessage(`It's not enough words to study. Game is loading in play mode`);
        }); 
      }
      showSpinner(false);
    }
  }

  async updateSettingsInDataBase(chapter) {
    const round = gamesInLevel * chapter;
    this.model.settings.optional.speakit.round = round;
    const updatedSettings = {
      optional: this.model.settings.optional
    }
    await this.model.settingsObject.updateSettings(updatedSettings);

  }

  newGame(e) {
    let chapter;
    if (e !== undefined) {
        chapter = this.chapters.setActiveElement(e.target);
    }
    this.updateSettingsInDataBase(chapter)
      .then(() => this.cardsPage.refresh(chapter));
  }

  renderChapters() {
    if (!this.isLoadStudiedWords) {
      const activeChapter = this.model.difficult + 1;
      this.chapters = new Chapters(this.gamePage, activeChapter);
      this.chapters.render();
      
      this.chapters.node.addEventListener('click', (e) => {
        this.newGame(e);
      });
    } else {
        addElement('ul', this.gamePage, 'speakit-chapters', 'speakit-chapters', null, ['visible', 'hidden']);
    }
  }

  renderCloseButton() {
    const closeButton = addElement('div', this.gamePage, 'speakit-close');
    closeButton.addEventListener('click', () =>  {
      this.root.innerHTML = '';
      this.root.classList.remove('root-active');
      this.showMainWindow();
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

  hideMainWindow() {
    this.root.classList.add('root-speakit');
    this.main.classList.add('speakit');
  }

  showMainWindow() {
    this.root.classList.remove('root-speakit');
    this.main.classList.remove('speakit');
  }

  renderGamePage() {
    this.hideMainWindow();
    this.gamePage = addElement('div', this.container, 'speakit-gamePage');
    this.renderChapters();
    this.renderCloseButton();
    this.renderContent();
    showSpinner(false);
  }

  returnToGame() {
    this.gamePage.classList.remove('hidden');
    this.statPage.classList.add('hidden');
  }

  init() {
    this.root = document.querySelector('.root');
    this.root.classList.add('root-active');
    this.speakit = addElement('div', this.root, 'speakit', 'speakit');
    this.container = addElement('div', this.speakit, 'container');
    if (this.isNeedToLoadStartPage) {
      if (this.model.words.wordsToStudy.length >= minWordsToStudy) {  
        this.renderStartPage(true);
      } else {
        this.renderStartPage(false);
      }
    } else {
      this.renderGamePage();
    }
  }
}
