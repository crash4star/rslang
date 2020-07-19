import UIComponent from './UIComponent';

class Image extends UIComponent {
  constructor(id, attributes, styles) {
    super('img', id, '', attributes, styles);
  }

  getSrc() {
    return this.element.src;
  }

  setSrc(src) {
    this.element.src = src;
  }
}

export default Image;
