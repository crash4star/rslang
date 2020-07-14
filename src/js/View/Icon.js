import UIComponent from './UIComponent';

class Icon extends UIComponent {
  constructor(id, styles) {
    super('i', id, '', {}, styles);
  }

  getSrc() {
    return this.element.src;
  }

  setSrc(src) {
    this.element.src = src;
  }
}

export default Icon;
