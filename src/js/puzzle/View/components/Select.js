import UIComposite from './UIComposite';
import Option from './Option';

class Select extends UIComposite {
  constructor(id, styles, attributes = {}, options = []) {
    super('select', id, '', attributes, styles);
    this.element.name = id;
    if (options.length) {
      options.forEach((option, index) => {
        this.add(new Option(index.toString(), option));
      });
    }
  }

  getValue() {
    return this.element.value;
  }

  setValue() {
    this.element.value = this.element.options[this.element.selectedIndex];
  }
}

export default Select;
