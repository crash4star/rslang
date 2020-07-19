import UIComponent from './UIComponent';

class Label extends UIComponent {
  constructor(id, text, attributes, styles) {
    super('label', id, text, attributes, styles);
  }

  getValue() {
    return this.element.innerHTML;
  }

  setValue(value) {
    this.element.innerHTML = value;
  }
}

export default Label;
