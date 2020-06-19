import UIComponent from './UIComponent';

class Paragraph extends UIComponent {
  constructor(id, text, styles) {
    super('p', id, text, '', styles);
  }

  getText() {
    return this.element.textContent;
  }

  setText(text) {
    this.element.textContent = text;
  }
}

export default Paragraph;
