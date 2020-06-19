import UIComponent from './UIComponent';

class InputField extends UIComponent {
  constructor(id, text, attributes, styles) {
    super('input', id, text, attributes, styles);
  }

  getValue() {
    return this.element.value;
  }

  setValue(value) {
    this.element.value = value;
  }

  getPlaceholder() {
    return this.element.placeholder;
  }

  setPlaceholder(placeholder) {
    this.element.placeholder = placeholder;
  }
}

export default InputField;
