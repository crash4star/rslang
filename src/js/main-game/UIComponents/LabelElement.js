import GeneralContainerElement from './GeneralContainerElement';

class LabelElement extends GeneralContainerElement {
    constructor(id, text, inputElem, InputBefore) {
        super('label', id);
        this.text = text;
        this.input = inputElem;
        this.isBefore = InputBefore;
        this.build(); 
    }

    build() {
        this.addChildren(this.input);
        const span = document.createElement('span');
        span.innerText = this.text;
        if (this.isBefore) {
            this.element.prepend(span);
        } else {
            this.element.append(span);
        }
    }
}

export default LabelElement;