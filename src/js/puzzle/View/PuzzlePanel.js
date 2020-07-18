// import UIComposite from './components/UIComposite';
// import Link from './components/Link';
import Container from './components/Container';
// import Button from './components/Button';
// import Image from './components/Image';
// import Svg from './components/Svg';
// import InputField from './components/InputField';
import Paragraph from './components/Paragraph';
// import Select from './components/Select';

class PuzzlePanel extends Container {
  constructor(id = 'puzzle-panel', styles = 'puzzle__puzzle-panel') {
    super(id, styles);
    this.renderPuzzlePanel();
  }

  renderPuzzlePanel() {
    const puzzleBox = new Container('puzzle-box', 'puzzle__puzzle-box');
    this.add(puzzleBox);
  }

  addLine(index) {
    console.log('ssss');
    this.getChild('puzzle-box').add(new Container(`line-${index}`, 'puzzle__line'));
    this.getChild('puzzle-box').getHtml();
    console.log(this);
  }

  addItem(line, item) {
    this.getChild('puzzle-box').getChild(`line-${line}`).add(item);
    this.getChild('puzzle-box').getChild(`line-${line}`).getHtml();
  }

  getItems(line) {
    const items = Object.values(this.getChild('puzzle-box').getChild(`line-${line}`).getHtml().children);
    return items;
  }

  getLineChildren(line) {
    const items = Object.values(this.getChild('puzzle-box').getChild(`line-${line}`).children);
    return items;
  }

  getAllItems() {
    const items = [];
    this.getChild('puzzle-box').children.forEach((element, index) => {
      const lineItems = this.getLineChildren(index);
      lineItems.forEach((item) => {
        items.push(item);
      });
    });
    return items;
  }

  getLine(line) {
    const item = this.getChild('puzzle-box').getChild(`line-${line}`);
    return item;
  }

  getLineData(line) {
    return Object.values(this.getChild('puzzle-box').getChild(`line-${line}`).children);
  }

  getLineValues(line) {
    const result = [];
    const items = this.getItems(line);
    items.forEach((element) => {
      result.push(element.textContent);
    });
    return result;
  }

  markCorrectsAndIncorrectsItems(marks, line) {
    const items = this.getItems(line);
    marks.forEach((element, index) => {
      if (element === true) {
        if (items[index].className.includes('puzzle__incorrect-mark')) {
          items[index].classList.remove('puzzle__incorrect-mark');
        }
        items[index].classList.add('puzzle__correct-mark');
      } else {
        if (items[index].className.includes('puzzle__correct-mark')) {
          items[index].classList.remove('puzzle__correct-mark');
        }
        items[index].classList.add('puzzle__incorrect-mark');
      }
    });
  }

  removeAllItems(line) {
    this.getChild('puzzle-box').getChild(`line-${line}`).removeChildren();
    // this.getHtml();
    // console.log('element: ', this.getChild('phrase-wrapper').children);
    // this.getChild('phrase-wrapper').getHtml();
  }

  removeAllLines() {
    Object.values(this.getChild('puzzle-box').children).forEach((element, index) => {
      element.removeChildren();
      this.getChild('puzzle-box').removeChild(element.getHtml().id);
    });
    // this.getHtml();
    // console.log('element: ', this.getChild('phrase-wrapper').children);
    // this.getChild('phrase-wrapper').getHtml();
  }

  setElements(line, data) {
    data.forEach((element) => {
      this.getChild('puzzle-box').getChild(`line-${line}`).add(element);
      // this.getChild('puzzle-box').getChild(`line-${line}`).getHtml();
    });
  }

  getBackgroundSize(imageData) {
    console.log('imageData: ', imageData);
    if (imageData.imgCoefficient <= imageData.fieldCoefficient) {
      return `${imageData.fieldWidth}px auto`;
    }
    return 'auto 400px';
  }

  setBackground(url, imageData) {
    let x;
    let y;
    const divider = 2;
    if (imageData.imgCoefficient <= imageData.fieldCoefficient) {
      y = (((imageData.fieldWidth / imageData.imgWidth) * imageData.imgHeight) - imageData.definedHeight) / divider;
      x = 0;
    } else {
      x = (((imageData.definedHeight / imageData.imgHeight) * imageData.imgWidth) - imageData.fieldWidth) / divider;
      y = 0;
    }
    this.box = document.getElementById('puzzle-box');
    this.box.style.backgroundImage = `url('${url}')`;
    this.box.style.backgroundSize = this.getBackgroundSize(imageData);
    this.box.style.backgroundRepeat = 'no-repeat';
    this.box.style.backgroundPosition = `${-x}px ${-y}px`;
  }
}

export default PuzzlePanel;
