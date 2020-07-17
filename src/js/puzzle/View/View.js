// import Utils from './Utils';
// import ImageComponent from './components/Image';
import Container from './components/Container';
import Statistic from '../../utils/createStatistic';
import ViewMethods from '../../utils/view-methods';
// import Paragraph from './Paragraph';

class View {
  constructor(favicon, mainPage, controlPanel, hintsPanel, puzzlePanel, phrasePanel) {
    this.favicon = favicon;
    this.mainPage = mainPage;
    this.controlPanel = controlPanel;
    this.hintsPanel = hintsPanel;
    this.puzzlePanel = puzzlePanel;
    this.phrasePanel = phrasePanel;
    console.log('controlPanel: ', controlPanel);
    this.appHead = document.head;
    this.app = document.querySelector('.root');
    this.app.classList.add('root-active');
    this.appHead.append(this.favicon.getHtml());
    this.startPage = new Container('game-wrapper', 'puzzle__game-wrapper');
    this.startPage.add(this.mainPage);
    this.app.append(this.startPage.getHtml());
    // this.currentLevelData = {};
    // console.log(this);
  }

  showStatisticEvent(getStatistic) {
    window.removeEventListener('resize', this.resize);
    this.statistic = new Statistic( new ViewMethods());
    const statistic = getStatistic();
    this.gamePage.removeElement();
    this.statistic.renderStat(statistic.correct, statistic.incorrect);
    console.log('statistic: ', statistic);
  }

  renderGamePage() {
    this.gamePage = new Container('game-wrapper', 'puzzle__game-wrapper');
    this.gamePage.add(this.controlPanel, this.hintsPanel,
      this.puzzlePanel, this.phrasePanel);
    this.app.append(this.gamePage.getHtml());
  }

  startGameEvent(startGame) {
    this.mainPage.getHtml().addEventListener('click', (event) => {
      if (event.target.className.includes('puzzle__start')) {
        this.isResultPage = false;
        this.startPage.removeElement();
        this.renderGamePage();
        // this.controlPanelEvents();
        this.hintsEvents();
        // puzzlePanelEvents
        //this.resizeEvent();
        startGame();
      }
    });
  }

  resizeEvent(getImageUrl, isBgImage) {
    this.resize = async () => {
      this.puzzlePanelWidth = this.getWidth();
      this.items = this.phrasePanel.getChildren();
      this.lineItems = this.puzzlePanel.getAllItems();
      const allItems = this.items.concat(this.lineItems);
      console.log('lineItems!!!!!!!!!!!!!!!!!!!: ', this.lineItems);
      console.log('this.items', this.items);
      const imageData = await this.getImageData(getImageUrl());
      console.log('imageData: ', imageData);
      if (allItems.length) {
        allItems.forEach((element) => {
          this.phrasePanel.setItemWidth(element, imageData);
        });
      }
      this.phrasePanel.addPuzzleBackGround(allItems, getImageUrl(), imageData, isBgImage());
      // setItemWidth(item, this.puzzlePanelWidth);
      // this.addPuzzleBackGround(image, sentence, line);
      // this.isResultPage
      console.log('this.isResultPage:resizzzzzzeee ', this.isResultPage);
      if (this.isResultPage) {
        this.puzzlePanel.setBackground(getImageUrl(), imageData);
      }
    }
    window.addEventListener('resize', this.resize);
  }

  hintsEvents() {
    this.hintsPanel.getHtml().addEventListener('click', (event) => {
      console.log(event.target);
      if (event.target.className.includes('puzzle__play-wrapper')) {
        this.hintsPanel.playSound();
      }
    });
  }

  correctAnswerEvent(line) {
    this.correctAnswer = (event) => {
      if (event.target.className.includes('puzzle__phrase-block')) {
        console.log(event.target.className);
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
    console.log('currentLine: ', this.currentLine);
    this.currentLine.addEventListener('click', this.correctAnswer);
  }

  gameEvents(check, continueGame, line, dontKnowEvent, showResult) {
    this.phrasePanel.getHtml().addEventListener('click', (event) => {
      console.log(event.target);
      if (event.target.className.includes('puzzle__phrase-block')) {
        const phraseWrapper = this.phrasePanel.getChild('phrase-wrapper');
        const item = phraseWrapper.getChild(event.target.id);
        phraseWrapper.removeChild(event.target.id);
        phraseWrapper.getHtml();
        this.puzzlePanel.addItem(line(), item);
        console.log('phraseWrapper.children.length: ', phraseWrapper);
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
      } else if (event.target.className.includes('puzzle__continue')) { // ????
        if (continueGame()) {
          this.phrasePanel.deactivateButton('continue');
          this.phrasePanel.activateButton('dont-know');
        } else {
          this.isResultPage = showResult();
          console.log('this.isResultPage: ', this.isResultPage);
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

  controlPanelEvents(changeSettings, isBgImage, bgUrl) {
    this.controlPanel.getHtml().addEventListener('click', (event) => {
      console.log(event.target.id);
      if (event.target.className.includes('puzzle__close-button')) {
        this.closeGameEvent();
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
            // this.hintsPanel.activateHint('play-wrapper');
            changeSettings('auto-wrapper', false);
          } else if (event.target.className.includes('puzzle__picture-wrapper')) {
            // this.hintsPanel.activateHint('play-wrapper');
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
            // this.hintsPanel.activateHint('play-wrapper');
            changeSettings('auto-wrapper', true);
          } else if (event.target.className.includes('puzzle__picture-wrapper')) {
            // this.hintsPanel.activateHint('play-wrapper');
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
      if (isBgImage) {
        elementHtml.style.backgroundImage = `url(${imageUrl})`;
        elementHtml.style.color = '#fff';
      } else {
        elementHtml.style.backgroundImage = ``;
        elementHtml.style.color = 'rgb(117, 5, 168)';
      }
    });
  }

  closeGameEvent(changeLevel) {
    if (event.target.className.includes('puzzle__close-button')) {
      window.removeEventListener('resize', this.resize);
      this.gamePage.removeElement();
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
    console.log('getComputedStyle: ', window.getComputedStyle(document.querySelector('.puzzle__puzzle-box')).width.split('px')[0]);
    this.size = size;
    return size[0];
  }
}

export default View;
