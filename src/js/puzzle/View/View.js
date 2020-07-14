// import Utils from './Utils';
import Image from './components/Image';
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
    this.app = document.getElementById('root');
    this.appHead.append(this.favicon.getHtml());
    this.app.append(this.mainPage.getHtml());
    // this.currentLevelData = {};
    // console.log(this);
  }

  renderGamePage() {
    this.gamePage = [this.controlPanel.getHtml(), this.hintsPanel.getHtml(),
      this.puzzlePanel.getHtml(), this.phrasePanel.getHtml()];
    this.app.append(...this.gamePage);
  }

  startGameEvent(startGame) {
    this.mainPage.getHtml().addEventListener('click', (event) => {
      if (event.target.className.includes('start')) {
        this.mainPage.removeElement();
        this.renderGamePage();
        this.controlPanelEvents();
        // puzzlePanelEvents
        startGame();
      }
    });
  }

  gameEvents(check, continueGame, line, dontKnowEvent, showResult) {
    this.phrasePanel.getHtml().addEventListener('click', (event) => {
      console.log(event.target);
      if (event.target.className.includes('phrase-block')) {
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
      } else if (event.target.className.includes('check')) {
        if (check()) {
          this.phrasePanel.deactivateButton('check', 'dont-know');
          this.phrasePanel.activateButton('continue');
        } else {
          this.phrasePanel.deactivateButton('continue');
          this.phrasePanel.activateButton('check', 'dont-know');
        }
      } else if (event.target.className.includes('continue')) { // ????
        if (continueGame()) {
          this.phrasePanel.deactivateButton('continue');
          this.phrasePanel.activateButton('check', 'dont-know');
        } else {
          showResult();
        }
      } else if (event.target.className.includes('dont-know')) {
        dontKnowEvent();
        if (check()) {
          this.phrasePanel.deactivateButton('check', 'dont-know');
          this.phrasePanel.activateButton('continue');
        }
      }
    });
  }

  controlPanelEvents() {
    this.controlPanel.getHtml().addEventListener('click', (event) => {
      console.log(event.target.id);
      if (event.target.className.includes('select-button')) {
        console.log('sdsdsdssssssssssss');
      } else if (event.target.className.includes('auto-sound-wrapper') || event.target.className.includes('translation-wrapper')
        || event.target.className.includes('picture-wrapper') || event.target.className.includes('sound-wrapper')) {
        if (event.target.className.includes('hint-active')) {
          if (event.target.className.includes('translation-wrapper')) {
            this.hintsPanel.deactivateHint('translation');
          } else if (event.target.className.includes('sound-wrapper')) {
            this.hintsPanel.deactivateHint('play-wrapper');
          }
          this.controlPanel.deactivateButton(event.target.id);
        } else {
          if (event.target.className.includes('translation-wrapper')) {
            this.hintsPanel.activateHint('translation');
          } else if (event.target.className.includes('sound-wrapper')) {
            this.hintsPanel.activateHint('play-wrapper');
          }
          this.controlPanel.activateButton(event.target.id);
        }
      }
    });
  }

  getWidth() {
    const size = window.getComputedStyle(document.querySelector('.puzzle-box'))
      .width.split('px');
    console.log('getComputedStyle: ', window.getComputedStyle(document.querySelector('.puzzle-box')).width.split('px')[0]);
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
  //       auto-sound
  // translation
  // sound
  // picture
  // changeGameLevelEvent(startGame) {
  //   this.controlPanel.getHtml().addEventListener('click', (event) => {
  //     if (event.target.className.includes('select-button')) {
  //       console.log('sdsdsdssssssssssss');
  //       // changeLevel();
  //       // this.controlPanel.getHtml().remove();
  //       // this.ui.wordPanel.getHtml().remove();
  //       // this.ui.puzzlePanel.getHtml().remove();
  //       // this.ui.phrasePanel.getHtml().remove();
  //       startGame();
  //     }
  //   });
  // }

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
}

export default View;
