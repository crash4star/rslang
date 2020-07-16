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
    const gameControls = new Container('game-controls', 'puzzle__game-controls');
    const closeButton = new Button('close-button', '', {}, 'puzzle__close-button');
    gameControls.add(closeButton);
    const gameOptions = new Container('game-options', 'puzzle__game-options');
    const autoSound = new Container('auto-wrapper', 'puzzle__auto-wrapper');
    const translation = new Container('translation-wrapper', 'puzzle__translation-wrapper');
    const sound = new Container('sound-wrapper', 'puzzle__sound-wrapper');
    const picture = new Container('picture-wrapper', 'puzzle__picture-wrapper');
    gameOptions.add(autoSound, translation, sound, picture);
    this.add(gameControls, gameOptions);
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
