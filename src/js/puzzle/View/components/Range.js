import UIComponent from './UIComponent';

class Range extends UIComponent {
  constructor(id, styles) {
    super('input', id, '', {}, styles);
    this.element.type = 'range';
  }

  getValue() {
    return this.element.value;
  }

  setValue(value) {
    this.element.value = value;
  }
}

export default Range;
