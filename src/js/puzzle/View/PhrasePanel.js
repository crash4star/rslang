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
  sortItems() {
    const items = [];
    this.getChild('phrase-wrapper').children.forEach((el, index) => {
      items.push(this.getChild('phrase-wrapper').children.find((el) => {
        return el.index === index;
      }));
    });
    this.removeAllItems();
    return items;
  }

  updatePhrasePanel(data, currentIndex, imageData, image, isBgImage) {
    const items = shuffle(this.generateItems(data, currentIndex, imageData));
    items.forEach((element) => {
      this.getChild('phrase-wrapper').add(element);
      console.log('item: ', items);
    });
    this.addPuzzleBackGround(items, image, imageData, isBgImage);
  }

  generateItems(data, currentIndex, imageData) {
    const items = [];
    console.log('imageData: ', imageData);
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
      this.setItemWidth(item, imageData);
      items.push(item);
      console.log('item: ', item);
    });
    return items;
  }

  setItemWidth(item, imageData) {
    const itemHtml = item.getHtml();
    const widthToOneChar = imageData.fieldWidth / (item.sentenceLength - item.numOfSpaces);
    const currentWidth = item.wordLength * widthToOneChar;
    console.log('item.wordLength: ', item.wordLength);
    itemHtml.style.width = `${currentWidth}px`;
  }

  showPaintingInfo(data) {
    const item = new Paragraph('decription', `${data}`, 'puzzle__description-block', {});
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

  getBackgroundSize(imageData) {
    console.log('imageData: ', imageData);
    if (imageData.imgCoefficient <= imageData.fieldCoefficient) {
      return `${imageData.fieldWidth}px auto`;
    }
    return 'auto 400px';
  }

  getBackgroundPosition(item, imageData) { // element.textContent, element.sentence, index, element.lineIndex
    let x;
    let y;
    if (imageData.imgCoefficient <= imageData.fieldCoefficient) {
      const offsetY = (((imageData.fieldWidth / imageData.imgWidth) * imageData.imgHeight)
        - imageData.definedHeight) / 2;
      y = (offsetY + item.lineIndex * 40) * -1;
      const arrOfWords = item.answerPhrase;
      let wordsLength = 0;
      for (let i = 0; i < item.index; i += 1) {
        wordsLength += arrOfWords[i].length;
      }
      x = ((imageData.fieldWidth / (item.sentenceLength - item.numOfSpaces)) * wordsLength) * -1;
    } else {
      const offsetX = (((imageData.definedHeight / imageData.imgHeight) * imageData.imgWidth)
        - imageData.fieldWidth) / 2;
      y = item.lineIndex * -40;
      const arrOfWords = item.answerPhrase;
      let wordsLength = 0;
      for (let i = 0; i < item.index; i += 1) {
        wordsLength += arrOfWords[i].length;
      }
      x = ((imageData.fieldWidth / (item.sentenceLength - item.numOfSpaces)) * wordsLength + offsetX) * -1;
    }
    return { x, y };
  }

  addPuzzleBackGround(items, image, imageData, isBgImage) {
    console.log('this.getBackgroundSize(): ', this.getBackgroundSize(imageData));
    items.forEach((element, index) => {
      const position = this.getBackgroundPosition(element, imageData);
      const elementHtml = element.getHtml();
      if (isBgImage) {
        elementHtml.style.backgroundImage = `url(${image})`;
        elementHtml.style.color = '#fff';
        elementHtml.style.textShadow = '0 0 5px rgb(0, 0, 0)';
      } else {
        elementHtml.style.backgroundImage = ``;
        elementHtml.style.color = 'rgb(117, 5, 168)';
        elementHtml.style.textShadow = '0 0 1px rgb(0, 0, 0)';
      }
      elementHtml.style.backgroundSize = this.getBackgroundSize(imageData);
      elementHtml.style.backgroundRepeat = 'no-repeat';
      elementHtml.style.backgroundPosition = `${position.x}px ${position.y}px `;
    });
  }

  removeAllItems() {
    this.getChild('phrase-wrapper').removeChildren();
  }

  getChildren() {
    return Array.from(this.getChild('phrase-wrapper').children);
  }

  addItem(item) {
    this.getChild('phrase-wrapper').add(item);
    this.getChild('phrase-wrapper').getHtml();
  }
}

export default PhrasePanel;
