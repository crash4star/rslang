// import Utils from './Utils';
import Image from './components/Image';
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
        this.startPage.removeElement();
        this.renderGamePage();
        // this.controlPanelEvents();
        this.hintsEvents();
        // puzzlePanelEvents
        this.resizeEvent();
        startGame();
      }
    });
  }

  resizeEvent() {
    window.addEventListener('resize', () => {
      this.puzzlePanelWidth = this.getWidth();
      this.items = this.phrasePanel.getChildren();
      console.log('this.items', this.items);
      if (this.items.length) {
        this.items.forEach((element) => {
          this.phrasePanel.setItemWidth(element, this.puzzlePanelWidth);
        });
      }
      // setItemWidth(item, this.puzzlePanelWidth);
      // this.addPuzzleBackGround(image, sentence, line);
    });
  }

  hintsEvents() {
    this.hintsPanel.getHtml().addEventListener('click', (event) => {
      console.log(event.target);
      if (event.target.className.includes('puzzle__play-wrapper')) {
        this.hintsPanel.playSound();
      }
    });
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
        // this.puzzlePanel.getHtml();
        console.log('phraseWrapper.children.length: ', phraseWrapper);
        if (!phraseWrapper.children.length) {
          this.phrasePanel.activateButton('check');
        }
      } else if (event.target.className.includes('puzzle__check')) {
        if (check()) {
          this.phrasePanel.deactivateButton('check', 'dont-know');
          this.phrasePanel.activateButton('continue');
        } else {
          this.phrasePanel.deactivateButton('continue');
          this.phrasePanel.activateButton('check', 'dont-know');
        }
      } else if (event.target.className.includes('puzzle__continue')) { // ????
        if (continueGame()) {
          this.phrasePanel.deactivateButton('continue');
          this.phrasePanel.activateButton('check', 'dont-know');
        } else {
          showResult();
        }
      } else if (event.target.className.includes('puzzle__dont-know')) {
        dontKnowEvent();
        if (check()) {
          this.phrasePanel.deactivateButton('check', 'dont-know');
          this.phrasePanel.activateButton('continue');
        }
      }
    });
  }

  controlPanelEvents(changeSettings) {
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
          }
          this.controlPanel.activateButton(event.target.id);
        }
      }
    });
  }

  closeGameEvent(changeLevel) {
    if (event.target.className.includes('puzzle__close-button')) {
      this.gamePage.removeElement();
      this.app = document.querySelector('.root');
      this.app.classList.remove('root-active');
    }
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
