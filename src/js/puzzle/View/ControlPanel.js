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
  constructor(id = 'control-panel', styles = 'puzzle__control-panel') {
    super(id, styles);
    this.renderControlPanel();
  }

  renderControlPanel() {
    const levelOptions = new Container('level-options', 'puzzle__level-options');
    const selectLevel = new Select('level-select', 'puzzle__level-select', { // add size on click
      autocomplete: 'off',
      name: 'level-select',
    }, ['1', '2', '3', '4', '5', '6']);
    const selectPage = new Select('page-select', 'puzzle__page-select', {
      autocomplete: 'off',
      name: 'page-select',
    }, ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
    const selectButton = new Button('select-button', 'Select', {}, 'puzzle__select-button');
    levelOptions.add(selectLevel, selectPage, selectButton);
    const gameOptions = new Container('game-options', 'puzzle__game-options');
    const autoSound = new Container('auto-wrapper', 'puzzle__auto-wrapper');
    const translation = new Container('translation-wrapper', 'puzzle__translation-wrapper');
    const sound = new Container('sound-wrapper', 'puzzle__sound-wrapper');
    const picture = new Container('picture-wrapper', 'puzzle__picture-wrapper');
    gameOptions.add(autoSound, translation, sound, picture);
    this.add(levelOptions, gameOptions);
  }

  activateButton(...id) {
    id.forEach((element) => {
      console.log('element: ', element);
      const button = this.getChild('game-options').getChild(element).getHtml();
      if (!button.className.includes('puzzle__hint-active')) {
        button.classList.add('puzzle__hint-active');
      }
    });
  }

  deactivateButton(...id) {
    id.forEach((element) => {
      console.log('element: ', element);
      const button = this.getChild('game-options').getChild(element).getHtml();
      if (button.className.includes('puzzle__hint-active')) {
        button.classList.remove('puzzle__hint-active');
      }
    });
  }

  updateControlPanel(currentSettings) {
    console.log('levelDataAAAAAAAAAAAAA: ', currentSettings);
    console.log('this: ', this);
    const fromZerroIndexCount = 1;
    const currentLevel = currentSettings.levelSettings.level - fromZerroIndexCount;
    const currentPage = currentSettings.levelSettings.page - fromZerroIndexCount;
    const pageSelect = document.getElementById('page-select');
    const levelSelect = document.getElementById('level-select');
    // console.log('aaaaaaaaaaaaaaaddddddddddddddddd0', typeof pageSelect.options);
    // Object.keys(pageSelect.options).forEach((element, index) => {
    //   console.log('element: ', element);
    //   if (currentPage === index) {
    //     pageSelect.options[element].setAttribute('selected', '');
    //   }
    // });
    // Object.keys(levelSelect.options).forEach((element, index) => {
    //   if (currentLevel === index) {
    //     levelSelect.options[element].setAttribute('selected', '');
    //   }
    // });
    document.getElementById('page-select').options[currentPage].selected = true;
    document.getElementById('level-select').options[currentLevel].selected = true;
    const buttonsID = ['auto-wrapper', 'translation-wrapper', 'sound-wrapper', 'picture-wrapper'];
    console.log('currentSettings: ', currentSettings);
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
