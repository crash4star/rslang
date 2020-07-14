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
  constructor(id = 'puzzle-panel', styles = 'puzzle-panel') {
    super(id, styles);
    this.renderPuzzlePanel();
  }

  renderPuzzlePanel() {
    const puzzleBox = new Container('puzzle-box', 'puzzle-box');
    this.add(puzzleBox);
  }

  addLine(index) {
    console.log('ssss');
    this.getChild('puzzle-box').add(new Container(`line-${index}`, 'line'));
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

  getLineData(line) {
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
        items[index].classList.add('correct-mark');
      } else {
        items[index].classList.add('incorrect-mark');
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
    this.getChild('puzzle-box').removeChildren();
    // this.getHtml();
    // console.log('element: ', this.getChild('phrase-wrapper').children);
    // this.getChild('phrase-wrapper').getHtml();
  }

  setElements(line, data) {
    data.forEach((element, index) => {
      const item = new Paragraph(`block-${index}`, `${data[index]}`, 'phrase-block', { draggable: 'true' });
      this.getChild('puzzle-box').getChild(`line-${line}`).add(item);
      this.getChild('puzzle-box').getChild(`line-${line}`).getHtml();
    });
  }

  // setBackground(url) {
  //   this.box = document.getElementById('puzzle-box');
  //   this.box.backgroundImage = `${url}`;
  // }
}

export default PuzzlePanel;
