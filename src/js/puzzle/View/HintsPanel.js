// import UIComposite from './components/UIComposite';
// import Link from './components/Link';
import Container from './components/Container';
// import Button from './components/Button';
// import Image from './components/Image';
// import Svg from './components/Svg';
// import InputField from './components/InputField';
import Paragraph from './components/Paragraph';
import Audio from './components/Audio';
// import Select from './components/Select';

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
