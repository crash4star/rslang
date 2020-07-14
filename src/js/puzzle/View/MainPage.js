// import UIComposite from './UIComposite';
// import Link from './Link';
import Container from './Container';
import Button from './Button';
// import Image from './Image';
// import Svg from './Svg';
// import InputField from './InputField';
import Paragraph from './Paragraph';
// import Select from './Select';

class MainPage extends Container {
  constructor(id = 'main-page', styles = 'main-page') {
    super(id, styles);
    this.renderMainPage();
  }

  renderMainPage() {
    const mainPageWrapper = new Container('main-wrapper', 'main-wrapper');
    mainPageWrapper.add(
      new Paragraph('heading', 'English Puzzle', 'heading'),
      new Paragraph('about', 'Click on words, collect phrases. Words can be drag and drop. Select tooltips in the menu', 'about'),
      new Button('start', 'Start Game', {}, 'start'),
    );
    this.add(mainPageWrapper);
  }
}

export default MainPage;
