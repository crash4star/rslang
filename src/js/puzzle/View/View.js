import Container from './components/Container';
import Statistic from '../../utils/createStatistic';
import ViewMethods from '../../utils/view-methods';
import NewGame from '../initApp';

class View {
  constructor(mainPage, controlPanel, hintsPanel, puzzlePanel, phrasePanel) {
    this.mainPage = mainPage;
    this.controlPanel = controlPanel;
    this.hintsPanel = hintsPanel;
    this.puzzlePanel = puzzlePanel;
    this.phrasePanel = phrasePanel;
    this.appHead = document.head;
    this.app = document.querySelector('.root');
    this.app.classList.add('root-active');
    this.appHead.append(this.favicon.getHtml());
    this.page = new Container('game-wrapper', 'puzzle__game-wrapper');
    this.page.add(this.mainPage);
    this.app.append(this.page.getHtml());
  }

  showStatisticEvent(getStatistic, continueGameEvent, updateDB) {
    updateDB();
    window.removeEventListener('resize', this.resize);
    this.statistic = new Statistic(new ViewMethods(), () => { this.continueEvent(continueGameEvent) });
    const statistic = getStatistic();
    this.page.removeElement();
    this.statistic.renderStat(statistic.correct, statistic.incorrect);
  }

  renderGamePage() {
    this.page = new Container('game-wrapper', 'puzzle__game-wrapper');
    this.page.add(this.controlPanel, this.hintsPanel,
      this.puzzlePanel, this.phrasePanel);
    this.app.append(this.page.getHtml());
  }

  startGameEvent(startGame) {
    this.mainPage.getHtml().addEventListener('click', (event) => {
      if (event.target.className.includes('puzzle__start')) {
        this.isResultPage = false;
        this.page.removeElement();
        this.renderGamePage();
        this.hintsEvents();
        startGame();
      }
    });
  }

  continueEvent(continueGameEvent) {
    continueGameEvent();
    this.newGameEvent();
  }

  newGameEvent() {
    window.removeEventListener('resize', this.resize);
    this.page.removeElement();
    this.app = document.querySelector('.root');
    this.app.classList.remove('root-active');
    NewGame();
  }

  resizeEvent(getImageUrl, isBgImage) {
    this.resize = async () => {
      const imageData = await this.getImageData(getImageUrl());
      if (!this.isResultPage) {
        this.puzzlePanelWidth = this.getWidth();
        this.items = this.phrasePanel.getChildren();
        this.lineItems = this.puzzlePanel.getAllItems();
        const allItems = this.items.concat(this.lineItems);
        if (allItems.length) {
          allItems.forEach((element) => {
            this.phrasePanel.setItemWidth(element, imageData);
          });
        }
        this.phrasePanel.addPuzzleBackGround(allItems, getImageUrl(), imageData, isBgImage());
      } else {
        this.puzzlePanel.setBackground(getImageUrl(), imageData);
      }
    }
    window.addEventListener('resize', this.resize);
  }

  hintsEvents() {
    this.hintsPanel.getHtml().addEventListener('click', (event) => {
      if (event.target.className.includes('puzzle__play-wrapper')) {
        this.hintsPanel.playSound();
      }
    });
  }

  correctAnswerEvent(line) {
    this.correctAnswer = (event) => {
      if (event.target.className.includes('puzzle__phrase-block')) {
        if (event.target.className.includes('puzzle__incorrect-mark')) {
          event.target.classList.remove('puzzle__incorrect-mark');
        } else if (event.target.className.includes('puzzle__correct-mark')) {
          event.target.classList.remove('puzzle__correct-mark');
        }
        const puzzleLine = this.puzzlePanel.getLine(line());
        const item = puzzleLine.getChild(event.target.id);
        puzzleLine.removeChild(event.target.id);
        puzzleLine.getHtml();
        this.phrasePanel.addItem(item);
        if (this.phrasePanel.getChild('phrase-wrapper').children.length) {
          this.phrasePanel.deactivateButton('continue', 'check');
          this.phrasePanel.activateButton('dont-know');
        }
      }
    }
    this.currentLine = this.puzzlePanel.getLine(line()).getHtml();
    this.currentLine.addEventListener('click', this.correctAnswer);
  }

  gameEvents(check, continueGame, line, dontKnowEvent, showResult) {
    this.phrasePanel.getHtml().addEventListener('click', (event) => {
      if (event.target.className.includes('puzzle__phrase-block')) {
        const phraseWrapper = this.phrasePanel.getChild('phrase-wrapper');
        const item = phraseWrapper.getChild(event.target.id);
        phraseWrapper.removeChild(event.target.id);
        phraseWrapper.getHtml();
        this.puzzlePanel.addItem(line(), item);
        if (!phraseWrapper.children.length) {
          this.phrasePanel.activateButton('check');
        }
      } else if (event.target.className.includes('puzzle__check')) {
        if (check()) {
          this.currentLine.removeEventListener('click', this.correctAnswer);
          this.phrasePanel.deactivateButton('check', 'dont-know');
          this.phrasePanel.activateButton('continue');
        } else {
          this.phrasePanel.deactivateButton('continue');
          this.phrasePanel.activateButton('check', 'dont-know');
        }
      } else if (event.target.className.includes('puzzle__continue')) {
        if (continueGame()) {
          this.phrasePanel.deactivateButton('continue');
          this.phrasePanel.activateButton('dont-know');
        } else {
          this.isResultPage = showResult();
        }
      } else if (event.target.className.includes('puzzle__dont-know')) {
        dontKnowEvent();
        if (check()) {
          this.currentLine.removeEventListener('click', this.correctAnswer);
          this.phrasePanel.deactivateButton('check', 'dont-know');
          this.phrasePanel.activateButton('continue');
        }
      }
    });
  }

  controlPanelEvents(changeSettings, isBgImage, bgUrl, changeServerSettings) {
    this.controlPanel.getHtml().addEventListener('input', (event) => {
      const toCountFromZerro = 1;
      if (event.target.className.includes('puzzle__level')) {
        const level = this.controlPanel.getChild('game-controls').getChild('range-wrapper').getChild('level');
        level.setLabelValue(`Level: ${event.target.value}`);
        changeServerSettings('level', event.target.value - toCountFromZerro);
      } else if (event.target.className.includes('puzzle__round')) {
        const round = this.controlPanel.getChild('game-controls').getChild('range-wrapper').getChild('round');
        round.setLabelValue(`Round: ${event.target.value}`);
        changeServerSettings('page', event.target.value - toCountFromZerro);
      }
    });
    this.controlPanel.getHtml().addEventListener('click', (event) => {
      if (event.target.className.includes('puzzle__close-button')) {
        this.closeGameEvent(event);
      } else if (event.target.className.includes('puzzle__change-button')) {
        this.newGameEvent();
      } else if (event.target.className.includes('puzzle__auto-wrapper') || event.target.className.includes('puzzle__translation-wrapper')
        || event.target.className.includes('puzzle__picture-wrapper') || event.target.className.includes('puzzle__sound-wrapper')) {
        if (event.target.className.includes('puzzle__hint-active')) {
          if (event.target.className.includes('puzzle__translation-wrapper')) {
            this.hintsPanel.deactivateHint('translation');
            changeSettings('translation-wrapper', false);
          } else if (event.target.className.includes('puzzle__sound-wrapper')) {
            this.hintsPanel.deactivateHint('play-wrapper');
            changeSettings('sound-wrapper', false);
          } else if (event.target.className.includes('puzzle__auto-wrapper')) {
            changeSettings('auto-wrapper', false);
          } else if (event.target.className.includes('puzzle__picture-wrapper')) {
            changeSettings('picture-wrapper', false);
            this.setPuzzleImageState(isBgImage(), bgUrl());
          }
          this.controlPanel.deactivateButton(event.target.id);
        } else {
          if (event.target.className.includes('puzzle__translation-wrapper')) {
            this.hintsPanel.activateHint('translation');
            changeSettings('translation-wrapper', true);
          } else if (event.target.className.includes('puzzle__sound-wrapper')) {
            this.hintsPanel.activateHint('play-wrapper');
            changeSettings('sound-wrapper', true);
          } else if (event.target.className.includes('puzzle__auto-wrapper')) {
            changeSettings('auto-wrapper', true);
          } else if (event.target.className.includes('puzzle__picture-wrapper')) {
            changeSettings('picture-wrapper', true);
            this.setPuzzleImageState(isBgImage(), bgUrl());
          }
          this.controlPanel.activateButton(event.target.id);
        }
      }
    });
  }

  setPuzzleImageState(isBgImage, imageUrl) {
    this.items = this.phrasePanel.getChildren();
    this.lineItems = this.puzzlePanel.getAllItems();
    const allItems = this.items.concat(this.lineItems);
    allItems.forEach((element) => {
      const elementHtml = element.getHtml();
      if (isBgImage && !elementHtml.className.includes('puzzle__description-block')) {
        elementHtml.style.backgroundImage = `url(${imageUrl})`;
        elementHtml.style.color = '#fff';
        elementHtml.style.textShadow = '0 0 5px rgb(0, 0, 0)';
      } else {
        elementHtml.style.backgroundImage = ``;
        elementHtml.style.color = 'rgb(117, 5, 168)';
        elementHtml.style.textShadow = '0 0 1px rgb(0, 0, 0)';
      }
    });
  }

  closeGameEvent(event) {
    if (event.target.className.includes('puzzle__close-button')) {
      window.removeEventListener('resize', this.resize);
      this.page.removeElement();
      this.app = document.querySelector('.root');
      this.app.classList.remove('root-active');
    }
  }

  loadImage(url) {
    return new Promise(resolve => {
      const image = new Image();
      image.addEventListener('load', () => {
        resolve(image);
      });
      image.src = url;
    });
  }

  async getImageData(url) {
    const image = await this.loadImage(url);
    const imageParams = {
      imgHeight: image.height,
      imgWidth: image.width,
      definedHeight: 400,
    }
    imageParams.imgCoefficient = imageParams.imgWidth / imageParams.imgHeight;
    imageParams.fieldCoefficient = this.getWidth() / imageParams.definedHeight;
    imageParams.fieldWidth = this.getWidth();
    return imageParams;
  }

  getWidth() {
    const size = window.getComputedStyle(document.querySelector('.puzzle__puzzle-box'))
      .width.split('px');
    this.size = size;
    return size[0];
  }
}

export default View;
