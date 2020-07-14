// import UIComposite from './components/UIComposite';
// import Link from './components/Link';
import Container from './components/Container';
import Button from './components/Button';
// import Image from './components/Image';
// import Svg from './components/Svg';
// import InputField from './components/InputField';
import Paragraph from './components/Paragraph';
// import Select from './components/Select';

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
