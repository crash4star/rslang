// import Utils from './Utils';
import Image from './components/Image';
import Container from './components/Container';
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
    this.app.append(this.mainPage.getHtml());
    // this.currentLevelData = {};
    // console.log(this);
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
        this.mainPage.removeElement();
        this.renderGamePage();
        // this.controlPanelEvents();
        this.hintsEvents();
        // puzzlePanelEvents
        startGame();
      }
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

  controlPanelEvents(changeSettings, changeLevel) {
    this.level = this.controlPanel.getChild('level-options').getChild('level-select').getHtml().value;
    this.page = this.controlPanel.getChild('level-options').getChild('page-select').getHtml().value;
    this.controlPanel.getHtml().addEventListener('change', (event) => {
      const element = event.target;
      if (element.className.includes('puzzle__level-select') ||
        element.className.includes('puzzle__page-select')) {
        if (element.className.includes('puzzle__level-select')) {
          this.level = element.value;
        } else {
          this.page = element.value;
        }
      }
      console.log(this.level, this.page);
    });
    this.controlPanel.getHtml().addEventListener('click', (event) => {
      console.log(event.target.id);
      if (event.target.className.includes('puzzle__select-button')) {
        this.changeGameLevelEvent(changeLevel);
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

  changeGameLevelEvent(changeLevel) {
    if (event.target.className.includes('puzzle__select-button')) {
      const level = this.level;
      const page = this.page;
      console.log('DAAATTTAAAAA', level, page);
      changeLevel(level, page);
    }
  }

  // fill phrase field
  // changeDefaultLevel(changeData) {
  //   const currentLevelData = {
  //     level: this.controlPanel.getChild('level-options')
  // .getChild('level-select').getHtml().value,
  //     page: this.controlPanel.getChild('level-options').getChild('page-select').getHtml().value,
  //   };
  //   changeData(currentLevelData.level, currentLevelData.page);
  //   this.controlPanel.getHtml().addEventListener('change', (event) => {
  //     const element = event.target;
  //     if (element.className.includes('level-select') ||
  // element.className.includes('page-select')) {
  //       if (element.className.includes('level-select')) {
  //         currentLevelData.level = element.value;
  //       } else {
  //         currentLevelData.page = element.value;
  //       }
  //     }
  //     changeData(currentLevelData.level, currentLevelData.page);
  //   });
  // }

  getWidth() {
    const size = window.getComputedStyle(document.querySelector('.puzzle__puzzle-box'))
      .width.split('px');
    console.log('getComputedStyle: ', window.getComputedStyle(document.querySelector('.puzzle__puzzle-box')).width.split('px')[0]);
    this.size = size;
    return size[0];
  }

  setNumOfChars(sentence) {
    console.log(this);
    if (sentence) {
      return sentence.length;
    }
    return null;
  }

  getBackgroundSize() {
    const definedHeight = 400;
    this.kImage = this.imgWidth / this.imgHeight;
    this.kField = this.puzzlePanelWidth / definedHeight;
    if (this.kImage <= this.kField) {
      return `${this.puzzlePanelWidth}px auto`;
    }
    return 'auto 400px';
  }

  getBackground(word, sentence, index, line) {
    console.log(word);
    const definedHeight = 400;
    this.kImage = this.imgWidth / this.imgHeight;
    this.kField = this.puzzlePanelWidth / definedHeight;
    let x;
    let y;
    if (this.kImage <= this.kField) {
      const offsetY = (((this.puzzlePanelWidth / this.imgWidth) * this.imgHeight)
        - definedHeight) / 2;
      y = (offsetY + line * 40) * -1;
      const arrOfWords = sentence.split(' ');
      let wordsLength = 0;
      for (let i = 0; i < index; i += 1) {
        wordsLength += arrOfWords[i].length;
      }
      x = ((this.puzzlePanelWidth / this.setNumOfChars(sentence)) * wordsLength) * -1;
    } else {
      const offsetX = (((definedHeight / this.imgHeight) * this.imgWidth)
        - this.puzzlePanelWidth) / 2;
      y = line * -40;
      const arrOfWords = sentence.split(' ');
      let wordsLength = 0;
      for (let i = 0; i < index; i += 1) {
        wordsLength += arrOfWords[i].length;
      }
      x = ((this.puzzlePanelWidth / this.setNumOfChars(sentence)) * wordsLength + offsetX) * -1;
    }
    return { x, y };
  }

  setImageOnItems(image, sentence, line) {
    const img = new Image('img', {
      src: image,
    }, 'img');
    img.getHtml().onload = () => {
      this.imgWidth = img.getHtml().width;
      this.imgHeight = img.getHtml().height;
      console.log(this.imgWidth, this.imgHeight);
      console.log('img: ', img);
      console.log(this);
      console.log('window: ', window);
      this.puzzlePanelWidth = this.getWidth();
      this.addPuzzleBackGround(image, sentence, line);
      console.log('puzzlePanelWidth: ', this.puzzlePanelWidth);
      window.addEventListener('resize', () => {
        this.puzzlePanelWidth = this.getWidth();
        console.log('puzzlePanelWidth: ', this.puzzlePanelWidth);
        this.addPuzzleBackGround(image, sentence, line);
      });
    };
  }

  addPuzzleBackGround(image, sentence, line) {
    // const styleObg = {
    //   boxSizing: 'border-box',
    //   verticalAlign: 'middle',
    //   textShadow: 'black 0 0 4px',
    //   border: '1px solid white',
    //   color: 'white',
    //   textAlign: 'center',
    //   userSelect: 'none',
    //   padding: '0',
    //   margin: '0',
    //   width: `${curWidth}px`,
    //   height: '40px'
    // }
    console.log('this.getBackgroundSize(): ', this.getBackgroundSize());
    if (this.puzzlePanel.getChild('puzzle-box').getChild(`line-${line}`).children.length) {
      this.puzzlePanel.getChild('puzzle-box').getChild(`line-${line}`).children.forEach((element, index) => {
        const el = element.getHtml();
        const widthToOneChar = this.puzzlePanelWidth / this.setNumOfChars(sentence);
        const curWidth = el.textContent.length * widthToOneChar;
        console.log('el.textContent.length: ', el.textContent.length);
        el.style.backgroundImage = `url(${image})`;
        el.style.backgroundSize = this.getBackgroundSize();
        el.style.backgroundRepeat = 'no-repeat';
        el.style.backgroundPosition = `${this.getBackground(el.textContent, sentence, index, line).x}px ${this.getBackground(el.textContent, sentence, index, line).y}px `;
        el.style.width = `${curWidth}px`;
      });
      this.puzzlePanel.getHtml();
    }
    if (this.phrasePanel.getChild('phrase-wrapper').children.length) {
      this.phrasePanel.getChild('phrase-wrapper').children.forEach((element, index) => {
        const el = element.getHtml();
        const widthToOneChar = this.puzzlePanelWidth / this.setNumOfChars(sentence);
        const curWidth = el.textContent.length * widthToOneChar;
        console.log('el.textContent.length: ', el.textContent.length);
        el.style.backgroundImage = `url(${image})`;
        el.style.backgroundSize = this.getBackgroundSize();
        el.style.backgroundRepeat = 'no-repeat';
        el.style.backgroundPosition = `${this.getBackground(el.textContent, sentence, index, line).x}px ${this.getBackground(el.textContent, sentence, index, line).y}px `;
        el.style.width = `${curWidth}px`;
      });
      this.phrasePanel.getHtml();
    }
  }
}

export default View;
