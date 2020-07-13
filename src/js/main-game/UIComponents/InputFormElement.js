import GeneralElement from './GeneralElement';

class InputFormElement extends GeneralElement {
    constructor(id, type) {
      super('input', id);
      this.element.type = type;
    }

    getValue() {
        if (this.element.type === 'checkbox' || this.element.type === 'radio') {
            return this.element.checked;
        }
        return this.element.value;
    }

    setValue(value) {
        if (this.element.type === 'checkbox' || this.element.type === 'radio') {
            this.element.checked = value;
        } else {
            this.element.value = value;
        }
    }
}

export default InputFormElement;