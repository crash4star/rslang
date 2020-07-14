// import UIComposite from './UIComposite';
// import Link from './Link';
import Container from './Container';
// import Button from './Button';
// import Image from './Image';
// import Svg from './Svg';
// import InputField from './InputField';
import Paragraph from './Paragraph';
import Audio from './Audio';
// import Select from './Select';

class HintsPanel extends Container {
  constructor(id = 'hints-panel', styles = 'hints-panel') {
    super(id, styles);
    this.renderWordPanel();
  }

  renderWordPanel() {
    const soundButton = new Container('play-wrapper', 'play-wrapper');
    const audio = new Audio('audio', {
      src: '',
    });
    const translation = new Paragraph('translation', '', 'translation');
    this.add(soundButton, audio, translation);
  }

  updateHintsPanel(text, audio) {
    this.getChild('translation').setText(text);
    this.getChild('audio').setSrc(audio);
  }

  deactivateHint(id) {
    const hint = this.getChild(id).getHtml();
    if (!hint.className.includes('hint-invisible')) {
      hint.classList.add('hint-invisible');
    }
  }

  activateHint(id) {
    const hint = this.getChild(id).getHtml();
    if (hint.className.includes('hint-invisible')) {
      hint.classList.remove('hint-invisible');
    }
  }
}

export default HintsPanel;
