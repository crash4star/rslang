// import UIComposite from './components/UIComposite';
// import Link from './components/Link';
import Container from './components/Container';
import Button from './components/Button';
import Image from './components/Image';
// import Svg from './components/Svg';
// import InputField from './components/InputField';
import Paragraph from './components/Paragraph';
// import Select from './components/Select';
import shuffle from '../../utils/shuffleArr';

class PhrasePanel extends Container {
  constructor(id = 'phrase-panel', styles = 'puzzle__phrase-panel') {
    super(id, styles);
    this.renderPhrasePanel();
  }

  renderPhrasePanel() {
    const phrase = new Container('phrase-wrapper', 'puzzle__phrase-wrapper');
    const buttonContainer = new Container('button-container', 'puzzle__button-container');
    const dontKnowButton = new Button('dont-know', 'I don\'t know', {}, 'puzzle__dont-know puzzle__active');
    const checkButton = new Button('check', 'Check', {}, 'puzzle__check');
    const continueButton = new Button('continue', 'Continue', {}, 'puzzle__continue');
    buttonContainer.add(dontKnowButton, checkButton, continueButton);
    this.add(phrase, buttonContainer);
  }

  // computeItemsSize() {
  //   const widthToOneChar = this.state.width / this.state.numOfChars
  //   const curWidth = item.content.length * widthToOneChar
  // }

  updatePhrasePanel(data, currentIndex, puzzlePanelWidth, image) {
    this.puzzlePanelWidth = puzzlePanelWidth;
    const items = shuffle(this.generateItems(data, currentIndex, puzzlePanelWidth));
    items.forEach((element) => {
      this.getChild('phrase-wrapper').add(element);
      console.log('item: ', items);
    });
    this.setImageOnItems(items, image);
  }

  generateItems(data, currentIndex, puzzlePanelWidth) {
    const items = [];
    console.log('puzzlePanelWidth: ', puzzlePanelWidth);
    console.log('data: ', data);
    data[currentIndex].answerPhrase.forEach((el, index) => {
      const item = new Paragraph(`block-${index}`, el, 'puzzle__phrase-block', {});
      // item.getHtml().style.width = '400px';
      const withoutLastWord = 1;
      item.numOfSpaces = data[currentIndex].answerPhrase.length - withoutLastWord;
      item.sentence = data[currentIndex].textExample;
      item.word = data[currentIndex].answerPhrase[index];
      item.sentenceLength = item.sentence.length;
      item.wordLength = item.word.length;
      item.lineIndex = currentIndex;
      item.index = index;
      item.answerPhrase = data[currentIndex].answerPhrase;
      this.setItemWidth(item, puzzlePanelWidth);
      items.push(item);
      console.log('item: ', item);
    });
    return items;
  }

  setItemWidth(item, puzzlePanelWidth) {
    const itemHtml = item.getHtml();
    const widthToOneChar = puzzlePanelWidth / (item.sentenceLength - item.numOfSpaces);
    const currentWidth = item.wordLength * widthToOneChar;
    console.log('item.wordLength: ', item.wordLength);
    itemHtml.style.width = `${currentWidth}px`;
  }

  showPaintingInfo(data) {
    const item = new Paragraph('decription', `${data}`, 'puzzle__phrase-block', {});
    // item.getHtml().style.width = '400px';
    this.getChild('phrase-wrapper').add(item);
    this.getChild('phrase-wrapper').getHtml();
  }

  activateButton(...id) {
    id.forEach((element) => {
      console.log('this: ', this);
      const button = this.getChild('button-container').getChild(element).getHtml();
      if (!button.className.includes('puzzle__active')) {
        button.classList.add('puzzle__active');
      }
    });
  }

  deactivateButton(...id) {
    id.forEach((element) => {
      const button = this.getChild('button-container').getChild(element).getHtml();
      if (button.className.includes('puzzle__active')) {
        button.classList.remove('puzzle__active');
      }
    });
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

  getBackgroundPosition(item) { // element.textContent, element.sentence, index, element.lineIndex
    const definedHeight = 400;
    this.kImage = this.imgWidth / this.imgHeight;
    this.kField = this.puzzlePanelWidth / definedHeight;
    let x;
    let y;
    if (this.kImage <= this.kField) {
      const offsetY = (((this.puzzlePanelWidth / this.imgWidth) * this.imgHeight)
        - definedHeight) / 2;
      y = (offsetY + item.lineIndex * 40) * -1;
      const arrOfWords = item.answerPhrase;
      let wordsLength = 0;
      for (let i = 0; i < item.index; i += 1) {
        wordsLength += arrOfWords[i].length;
      }
      x = ((this.puzzlePanelWidth / item.sentenceLength) * wordsLength) * -1;
    } else {
      const offsetX = (((definedHeight / this.imgHeight) * this.imgWidth)
        - this.puzzlePanelWidth) / 2;
      y = item.lineIndex * -40;
      const arrOfWords = item.answerPhrase;
      let wordsLength = 0;
      for (let i = 0; i < item.index; i += 1) {
        wordsLength += arrOfWords[i].length;
      }
      x = ((this.puzzlePanelWidth / item.sentenceLength) * wordsLength + offsetX) * -1;
    }
    return { x, y };
  }

  setImageOnItems(items, image) {
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
      // this.puzzlePanelWidth = this.getWidth();
      this.addPuzzleBackGround(items, image);
      console.log('puzzlePanelWidth: ', this.puzzlePanelWidth);
    };
  }

  addPuzzleBackGround(items, image) {
    console.log('this.getBackgroundSize(): ', this.getBackgroundSize());
    items.forEach((element, index) => {
      const position = this.getBackgroundPosition(element, index);
      const elementHtml = element.getHtml();
      elementHtml.style.backgroundImage = `url(${image})`;
      elementHtml.style.backgroundSize = this.getBackgroundSize();
      elementHtml.style.backgroundRepeat = 'no-repeat';
      elementHtml.style.backgroundPosition = `${position.x}px ${position.y}px `;
      elementHtml.style.color = '#fff';
    });
  }

  removeAllItems() {
    this.getChild('phrase-wrapper').removeChildren();
  }

  getChildren() {
    return Array.from(this.getChild('phrase-wrapper').children);
  }
}

export default PhrasePanel;
