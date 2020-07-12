import GeneralContainerElement from './GeneralContainerElement';

class LabelElement extends GeneralContainerElement {
  constructor(id, text, inputElem, InputBefore) {
    super('label', id);
    this.addChildren(inputElem);
    const span = document.createElement('span');
    span.innerText = text;
    if (InputBefore) {
      this.element.prepend(span);
    } else {
      this.element.append(span);
    }
    
    
  }
}

export default LabelElement;