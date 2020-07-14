// import UIComposite from './components/UIComposite';
// import Link from './components/Link';
import Container from './components/Container';
import Button from './components/Button';
// import Image from './components/Image';
// import Svg from './components/Svg';
// import InputField from './components/InputField';
// import Paragraph from './components/Paragraph';
import Select from './components/Select';

class ControlPanel extends Container {
  constructor(id = 'control-panel', styles = 'control-panel') {
    super(id, styles);
    this.renderControlPanel();
  }

  renderControlPanel() {
    const levelOptions = new Container('level-options', 'level-options');
    const selectLevel = new Select('level-select', 'level-select', { // add size on click
      autocomplete: 'off',
    }, ['1', '2', '3', '4', '5', '6']);
    const selectPage = new Select('page-select', 'page-select', {
      autocomplete: 'off',
    }, ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
    const selectButton = new Button('select-button', 'Select', {}, 'select-button');
    levelOptions.add(selectLevel, selectPage, selectButton);
    const gameOptions = new Container('game-options', 'game-options');
    const autoSound = new Container('auto-sound-wrapper', 'auto-sound-wrapper');
    const translation = new Container('translation-wrapper', 'translation-wrapper');
    const sound = new Container('sound-wrapper', 'sound-wrapper');
    const picture = new Container('picture-wrapper', 'picture-wrapper');
    gameOptions.add(autoSound, translation, sound, picture);
    this.add(levelOptions, gameOptions);
  }

  activateButton(...id) {
    id.forEach((element) => {
      console.log('element: ', element);
      const button = this.getChild('game-options').getChild(element).getHtml();
      if (!button.className.includes('hint-active')) {
        button.classList.add('hint-active');
      }
    });
  }

  deactivateButton(...id) {
    id.forEach((element) => {
      console.log('element: ', element);
      const button = this.getChild('game-options').getChild(element).getHtml();
      if (button.className.includes('hint-active')) {
        button.classList.remove('hint-active');
      }
    });
  }

  updateControlPanel(currentSettings) {
    console.log('levelDataAAAAAAAAAAAAA: ', currentSettings);
    console.log('this: ', this);
    const fromZerroIndexCount = 1;
    const currentLevel = currentSettings.levelSettings.level - fromZerroIndexCount;
    const currentPage = currentSettings.levelSettings.page - fromZerroIndexCount;
    document.getElementById('page-select').options[currentPage].selected = true;
    document.getElementById('level-select').options[currentLevel].selected = true;
    const buttonsID = ['auto-sound-wrapper', 'sound-wrapper', 'picture-wrapper', 'translation-wrapper'];
    const optionsArray = Object.keys(currentSettings.gameSettings);
    optionsArray.forEach((element, index) => {
      if (currentSettings.gameSettings[element] === true) {
        this.activateButton(buttonsID[index]);
      } else {
        this.deactivateButton(buttonsID[index]);
      }
    });
  }
}

export default ControlPanel;
