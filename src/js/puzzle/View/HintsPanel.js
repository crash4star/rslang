import Container from './components/Container';
import Paragraph from './components/Paragraph';
import Audio from './components/Audio';

class HintsPanel extends Container {
  constructor(id = 'hints-panel', styles = 'puzzle__hints-panel') {
    super(id, styles);
    this.renderWordPanel();
  }

  renderWordPanel() {
    const soundButton = new Container('play-wrapper', 'puzzle__play-wrapper', {
      title: 'play text example audio',
    });
    const audio = new Audio('audio', {
      src: '',
    });
    const translation = new Paragraph('translation', '', 'puzzle__translation');
    this.add(soundButton, audio, translation);
  }

  updateHintsPanel(text, audio) {
    this.getChild('translation').setText(text);
    this.getChild('audio').setSrc(audio);
  }

  deactivateHint(id) {
    const hint = this.getChild(id).getHtml();
    if (!hint.className.includes('puzzle__hint-invisible')) {
      hint.classList.add('puzzle__hint-invisible');
    }
  }

  activateHint(id) {
    const hint = this.getChild(id).getHtml();
    if (hint.className.includes('puzzle__hint-invisible')) {
      hint.classList.remove('puzzle__hint-invisible');
    }
  }

  playSound() {
    this.getChild('audio').getHtml().play();
  }
}

export default HintsPanel;
