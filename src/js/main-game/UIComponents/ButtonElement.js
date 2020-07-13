import GeneralElement from './GeneralElement';

class ButtonElement extends GeneralElement {
    constructor(id, text, type, value) {
        super('button', id);
        this.element.type = type || 'button';
        this.element.innerHTML = text;
        this.element.value = value || '';
    }
}

export default ButtonElement;