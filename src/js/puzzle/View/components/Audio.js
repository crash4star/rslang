import UIComponent from './UIComponent';

class Audio extends UIComponent {
  constructor(id, attributes, styles) {
    super('audio', id, '', attributes, styles);
  }

  getSrc() {
    return this.element.src;
  }

  setSrc(src) {
    this.element.src = src;
  }
}

export default Audio;
