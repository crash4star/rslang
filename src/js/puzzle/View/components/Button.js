import UIComponent from './UIComponent';

class Button extends UIComponent {
  constructor(id, text, attributes, styles) {
    super('button', id, text, attributes, styles);
  }

  getValue() {
    return this.element.value;
  }

  setValue(value) {
    this.element.value = value;
  }
}

export default Button;
