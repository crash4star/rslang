import UIComponent from './UIComponent';

class Paragraph extends UIComponent {
  constructor(id, text, styles, attributes = {}) {
    super('p', id, text, attributes, styles);
  }

  getText() {
    return this.element.textContent;
  }

  setText(text) {
    this.element.textContent = text;
  }
}

export default Paragraph;
