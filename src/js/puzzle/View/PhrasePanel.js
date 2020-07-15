// import UIComposite from './components/UIComposite';
// import Link from './components/Link';
import Container from './components/Container';
import Button from './components/Button';
// import Image from './components/Image';
// import Svg from './components/Svg';
// import InputField from './components/InputField';
import Paragraph from './components/Paragraph';
// import Select from './components/Select';

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

  updatePhrasePanel(data) {
    data.forEach((el, index) => {
      const item = new Paragraph(`block-${index}`, `${data[index]}`, 'puzzle__phrase-block', { draggable: 'true' });
      // item.getHtml().style.width = '400px';
      this.getChild('phrase-wrapper').add(item);
    });
  }

  showPaintingInfo(data) {
    const item = new Paragraph('decription', `${data}`, 'puzzle__phrase-block', { draggable: 'true' });
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

  removeAllItems() {
    this.getChild('phrase-wrapper').removeChildren();
    // this.getHtml();
    // console.log('element: ', this.getChild('phrase-wrapper').children);
    // this.getChild('phrase-wrapper').getHtml();
  }

  // getButton(id) {
  //   return document.getElementById(id);
  // }
}

export default PhrasePanel;
