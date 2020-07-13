import GeneralContainerElement from './GeneralContainerElement';

class FormElement extends GeneralContainerElement {
    constructor(id, method, action) {
        super('form', id);
        this.element.method = method || 'POST';
        this.element.action = action || '#';
    }
}

export default FormElement;