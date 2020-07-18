import Container from './components/Container';
import Button from './components/Button';
import Paragraph from './components/Paragraph';

class MainPage extends Container {
  constructor(id = 'main-page', styles = 'puzzle__main-page') {
    super(id, styles);
    this.renderMainPage();
  }

  renderMainPage() {
    const mainPageWrapper = new Container('main-wrapper', 'puzzle__main-wrapper');
    mainPageWrapper.add(
      new Paragraph('heading', 'English Puzzle', 'puzzle__heading'),
      new Paragraph('about', 'Click on words, collect phrases. Select tooltips in the menu', 'puzzle__about'),
      new Button('start', 'Start Game', {}, 'puzzle__start'),
    );
    this.add(mainPageWrapper);
  }
}

export default MainPage;
